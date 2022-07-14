
#### 测试入口
```js
import { cac } from "../src";
test("base-no-args", () => {
  const cli = cac();

  cli.option("--type [type]", "Choose a project type");
  
  const parsed = cli.parse(["", "", "--type", "foo"]);
  expect(parsed).toEqual({
    args: [],
    options: {
      "--": [],
    },
  });
});
```
#### 流程
1. src/index.ts
```ts
// index.ts
import CAC from './CAC'
import Command from './Command'

// 默认导入的 cac 是一个函数，该函数返回一个新的 CAC 实例
const cac = (name = '') => new CAC(name)

export default cac
export { cac, CAC, Command }
```

2. src/CAC.ts

只列出方法和返回值，具体实现暂时省略
```ts
class CAC {
  name: string;
  // Command 实例
  commands: Command[];
  // 全局的
  globalCommand: GlobalCommand;

  matchedCommand?: Command;
  matchedCommandName?: string;
  /**
   * 原始参数 数组
   */
  rawArgs: string[];
  /**
   * 转义后的参数
   */
  args: ParsedArgv["args"];
  /**
   * 转换后的 options cameCase
   */
  options: ParsedArgv["options"];

  showHelpOnExit?: boolean;
  showVersionOnExit?: boolean;

  constructor(name = "") {
    super();
    this.name = name;
    this.commands = [];
    this.rawArgs = [];
    this.args = [];
    this.options = {};
    this.globalCommand = new GlobalCommand(this);
    this.globalCommand.usage("<command> [options]");
  }

  usage(text: string) {
    this.globalCommand.usage(text);
    return this;
  }

  command(rawName: string, description?: string, config?: CommandConfig) {
    return command;
  }

  option(rawName: string, description: string, config?: OptionConfig) {
    return this;
  }

  help(callback?: HelpCallback) {
    return this;
  }

  version(version: string, customFlags = "-v, --version") {
    return this;
  }

  example(example: CommandExample) {
    return this;
  }

  outputHelp() {}

  outputVersion() {}

  private setParsedInfo(
    { args, options }: ParsedArgv,
    matchedCommand?: Command,
    matchedCommandName?: string
  ) {
    return this;
  }

  unsetMatchedCommand() {}

  parse(argv = processArgs, { run = true } = {}): ParsedArgv {
    return parsedArgv;
  }

  private mri(
    argv: string[],
    /** Matched command */ command?: Command
  ): ParsedArgv {
    return {
      args,
      options,
    };
  }

  runMatchedCommand() {
    return command.commandAction.apply(this, actionArgs);
  }
}

export default CAC;
```

3. cli.option("--type [type]", "Choose a project type");

```js
class CAC { 
  option(rawName: string, description: string, config?: OptionConfig) {
    this.globalCommand.option(rawName, description, config)
    return this
  }
}

// this.globalCommand.option(rawName, description, config) 就是调用 Command 实例的 option

```
4. Command
   
```ts
class Command {
  // 创建一个 option 实例，并push 到 options
  option(rawName: string, description: string, config?: OptionConfig) {
    const option = new Option(rawName, description, config)
    this.options.push(option)
    return this
  }
}
```

5. const parsed = cli.parse(["", "", "--type", "foo"]);

```ts
  // 通过解析 process.argv 参数
  // mri 是一个解析命令行参数的极简小库
class CAC {
  parse(argv = processArgs, { run = true, } = {}): ParsedArgv {
    // 获取 argv
    this.rawArgs = argv
    // 从 argv 中拿到名字
    if (!this.name)
      this.name = argv[1] ? getFileName(argv[1]) : 'cli'

    let shouldParse = true

    // 开始遍历自身储存的 commands
    for (const command of this.commands) {

      // 这里借助另一个函数来解析 argv
      const parsed = this.mri(argv.slice(2), command)

      const commandName = parsed.args[0]
      // 如果找到匹配的 command，那么就关掉 shouldParse
      if (command.isMatched(commandName)) {
        shouldParse = false
        const parsedInfo = {
          ...parsed,
          args: parsed.args.slice(1),
        }
        this.setParsedInfo(parsedInfo, command, commandName)

        // 注意，这里使用的 EventEmitter 中的 emit 方法
        // 触发了一个指令
        // 我们先有一个印象，在将 Command 类的时候，我们来重点讲解一下
        this.emit(`command:${commandName}`, command)
      }
    }

    if (shouldParse) {
      // 如果没有就去走默认指令，即指令名称是  [...xxx]
      for (const command of this.commands) {
        if (command.name === '') {
          shouldParse = false
          const parsed = this.mri(argv.slice(2), command)
          this.setParsedInfo(parsed, command)
          this.emit('command:!', command)
        }
      }
    }

    // 要是还没有找到匹配的呢，那么就最后再通过 mri parse 一遍
    if (shouldParse) {
      const parsed = this.mri(argv.slice(2))
      this.setParsedInfo(parsed)
    }

    if (this.options.help && this.showHelpOnExit) {
      this.outputHelp()
      run = false
      this.unsetMatchedCommand()
    }

    if (this.options.version && this.showVersionOnExit && this.matchedCommandName == null) {
      this.outputVersion()
      run = false
      this.unsetMatchedCommand()
    }

    const parsedArgv = { args: this.args, options: this.options }

    if (run)
      this.runMatchedCommand()

    if (!this.matchedCommand && this.args[0])
      this.emit('command:*')

    return parsedArgv
  }
}
```
6. process.argv  Node.js 进程时传递的命令行参数。第一个元素是 process.ExecPath。如果需要访问 argv [0]的原始值，请参见 process.argv0。第二个元素是正在执行的 JavaScript 文件的路径。其余的元素将是任何额外的命令行参数。
```js
import { argv } from 'node:process';

// print process.argv
argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

```
```js 
$ node process-args.js one two=three four
```
```js
0: /usr/local/bin/node
1: /Users/mjr/work/node/process-args.js
2: one
3: two=three
4: four
```

7. mri
mri 是一个解析命令行参数的极简小库
mri 的用法大概是这样的：

```js
const argv = ['_', 'd:\index.js', 'dev', 'server.ts', '--port', '3000', '--open']
const result = mri(argv.slice(2))
expect(result).toMatchInlineSnapshot(`
    {
      "_": [
        "dev",
        "server.ts",
      ],
      "open": true,
      "port": 3000,
    }
  `)
```