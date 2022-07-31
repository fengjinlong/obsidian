---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
vue3 响应式系统 ^5FlTGczH

proxy 代理对象 ^2RvojDjM

effect ^WGiDvWM1

get 收集依赖 ^lNAKzCG6

1. 执行 this.run()，同时 fn 被执行
2. 将当前的 effect 保存到activeEffect，activeEffect=effect ^3tWbJH2K

let obj = reactive({ a: 1 }), 对象被代理。
effect(() => {
    b = obj.a+1
})这里 fn 执行一次，activeEffect 被赋值，obj.a 触发 代理对象的get 操作 ^nmWujGg9

set 触发依赖 ^rYwvA1Xc

1. track 收集依赖track( target, key ）
  targetMap: {target: {key: depSet}}

2. depSet.add( activeEffect ) ^p7tb60Xq

  depSet: [ effect1, effect2, effect3... ] ^sYqrY8gu

trigger 触发依赖, 遍历 depSet ^ahlf5yWx

1. effect.scheduler() ?
2. effect.run() ? ^IYIu5HKd

渲染组件 ^neNYaDY8

processComponent ^p1mC4h8x

初始化组件 ^r1Hmo8jF

组件更新 ^BBnhh9eS

1. 初始化信息 props slots 
2. setupStatefulComponent处理组件状态，
2-1. 包括组件实例挂载setupResult（instance.setState = proxyRef(setupResult)）
2-2. 包括组件实例添加render 函数（template ? component.render ? ） ^AAZNshnL

setupRenderEffect ^Dx46OsTv


1. effect( fn )
2. 初始化 执行render 进行递归 patch，如果是element 进行渲染 
3. instance.update = effeft(fn, {scheduler}) ^UjYhMrDb

instance.update() ^yB1Wdjpq

入口 main.js
createApp(App).mount(#app)
createApp -- render -- patch ^v3HvzdqO

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://excalidraw.com",
	"elements": [
		{
			"type": "rectangle",
			"version": 224,
			"versionNonce": 1447302472,
			"isDeleted": false,
			"id": "AVLlmSPGYnCocjRFc60TF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -488.4771605201617,
			"y": -127.858071111524,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 202.2725830078125,
			"height": 81.53286743164062,
			"seed": 265756710,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "-uJfE8MHFGoCtbT8JUHff",
					"type": "arrow"
				},
				{
					"id": "I_7qsC2r8kx_RAAsGxNSS",
					"type": "arrow"
				}
			],
			"updated": 1659255181622,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 268,
			"versionNonce": 1683277222,
			"isDeleted": false,
			"id": "5FlTGczH",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -469.5132413045823,
			"y": -98.91819573632569,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 157,
			"height": 28,
			"seed": 246258618,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "J8mEHj6eF5l8At8bhA1TJ",
					"type": "arrow"
				}
			],
			"updated": 1659194206115,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "vue3 响应式系统",
			"rawText": "vue3 响应式系统",
			"baseline": 21,
			"textAlign": "right",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "vue3 响应式系统"
		},
		{
			"type": "rectangle",
			"version": 570,
			"versionNonce": 628011834,
			"isDeleted": false,
			"id": "KHA9MuA5lBboBBQHJUlyM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -220.90974185299604,
			"y": 65.96390531591851,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 169.09417724609375,
			"height": 64.1572265625,
			"seed": 1236746362,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"type": "text",
					"id": "2RvojDjM"
				},
				{
					"id": "J8mEHj6eF5l8At8bhA1TJ",
					"type": "arrow"
				},
				{
					"id": "FbGgyFASX4t22lSjSmlso",
					"type": "arrow"
				},
				{
					"id": "VqTQlH84Tx4pDr7XNJJSI",
					"type": "arrow"
				}
			],
			"updated": 1659194211619,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 602,
			"versionNonce": 1483279482,
			"isDeleted": false,
			"id": "Xa4MjZXbcPADBP8Tp5NIV",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -235.59587913384843,
			"y": -350.28605717303134,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 169.09417724609375,
			"height": 64.1572265625,
			"seed": 1539971750,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"type": "text",
					"id": "WGiDvWM1"
				},
				{
					"id": "-uJfE8MHFGoCtbT8JUHff",
					"type": "arrow"
				},
				{
					"id": "QE-CTn92ZnRYR8dPPiMUz",
					"type": "arrow"
				}
			],
			"updated": 1659194225196,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 498,
			"versionNonce": 1008549192,
			"isDeleted": false,
			"id": "2RvojDjM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -215.90974185299604,
			"y": 85.54251859716851,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 159.09417724609375,
			"height": 25,
			"seed": 490110886,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659254854773,
			"link": null,
			"locked": false,
			"fontSize": 20.0118461944772,
			"fontFamily": 1,
			"text": "proxy 代理对象",
			"rawText": "proxy 代理对象",
			"baseline": 18,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "KHA9MuA5lBboBBQHJUlyM",
			"originalText": "proxy 代理对象"
		},
		{
			"type": "text",
			"version": 434,
			"versionNonce": 1571043558,
			"isDeleted": false,
			"id": "WGiDvWM1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -230.59587913384843,
			"y": -330.70744389178134,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 159.09417724609375,
			"height": 25,
			"seed": 1278181818,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659194197465,
			"link": null,
			"locked": false,
			"fontSize": 20.0118461944772,
			"fontFamily": 1,
			"text": "effect",
			"rawText": "effect",
			"baseline": 18,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "Xa4MjZXbcPADBP8Tp5NIV",
			"originalText": "effect"
		},
		{
			"type": "rectangle",
			"version": 356,
			"versionNonce": 716648486,
			"isDeleted": false,
			"id": "in9WFARo9kTiODCweCTED",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 82.71798574958814,
			"y": -16.17056013127234,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 194,
			"height": 58,
			"seed": 1897619302,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"type": "text",
					"id": "lNAKzCG6"
				},
				{
					"id": "FbGgyFASX4t22lSjSmlso",
					"type": "arrow"
				},
				{
					"id": "XM4uNrn2XZtfsQJLyuMPM",
					"type": "arrow"
				},
				{
					"id": "G7Fn3gAwks1hK8oQ5nKRI",
					"type": "arrow"
				}
			],
			"updated": 1659194246826,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 293,
			"versionNonce": 1057364024,
			"isDeleted": false,
			"id": "lNAKzCG6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 87.71798574958814,
			"y": 0.3294398687276612,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 184,
			"height": 25,
			"seed": 321848038,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659254854776,
			"link": null,
			"locked": false,
			"fontSize": 20.035960080595355,
			"fontFamily": 1,
			"text": "get 收集依赖",
			"rawText": "get 收集依赖",
			"baseline": 18,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "in9WFARo9kTiODCweCTED",
			"originalText": "get 收集依赖"
		},
		{
			"type": "rectangle",
			"version": 704,
			"versionNonce": 1228127462,
			"isDeleted": false,
			"id": "lOM8Q4RlaK2QMTKzE49YX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 112.49634897913654,
			"y": -432.2647962802659,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 798.3012181549151,
			"height": 216.85998414789816,
			"seed": 1409619578,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "QE-CTn92ZnRYR8dPPiMUz",
					"type": "arrow"
				},
				{
					"id": "G7Fn3gAwks1hK8oQ5nKRI",
					"type": "arrow"
				}
			],
			"updated": 1659194246826,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 601,
			"versionNonce": 722169978,
			"isDeleted": false,
			"id": "3tWbJH2K",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 150.67052192689755,
			"y": -408.7688465910298,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 552,
			"height": 54,
			"seed": 1228247226,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659194000844,
			"link": null,
			"locked": false,
			"fontSize": 18.420792721169676,
			"fontFamily": 1,
			"text": "1. 执行 this.run()，同时 fn 被执行\n2. 将当前的 effect 保存到activeEffect，activeEffect=effect",
			"rawText": "1. 执行 this.run()，同时 fn 被执行\n2. 将当前的 effect 保存到activeEffect，activeEffect=effect",
			"baseline": 47,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "1. 执行 this.run()，同时 fn 被执行\n2. 将当前的 effect 保存到activeEffect，activeEffect=effect"
		},
		{
			"type": "arrow",
			"version": 583,
			"versionNonce": 831824456,
			"isDeleted": false,
			"id": "-uJfE8MHFGoCtbT8JUHff",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -288.4000792009025,
			"y": -134.46786914496113,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 95.458675354083,
			"height": 149.48864322293326,
			"seed": 70741734,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659254926865,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "AVLlmSPGYnCocjRFc60TF",
				"gap": 6.60979803343713,
				"focus": 0.5401327838813708
			},
			"endBinding": {
				"elementId": "Xa4MjZXbcPADBP8Tp5NIV",
				"gap": 2.1723182426369476,
				"focus": 0.19061965378363566
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					95.458675354083,
					-149.48864322293326
				]
			]
		},
		{
			"type": "text",
			"version": 792,
			"versionNonce": 871433702,
			"isDeleted": false,
			"id": "nmWujGg9",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 142.1584314252986,
			"y": -342.97509555054086,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 636,
			"height": 98,
			"seed": 1364652710,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659193995840,
			"link": null,
			"locked": false,
			"fontSize": 18.14057902126652,
			"fontFamily": 1,
			"text": "let obj = reactive({ a: 1 }), 对象被代理。\neffect(() => {\n    b = obj.a+1\n})这里 fn 执行一次，activeEffect 被赋值，obj.a 触发 代理对象的get 操作",
			"rawText": "let obj = reactive({ a: 1 }), 对象被代理。\neffect(() => {\n    b = obj.a+1\n})这里 fn 执行一次，activeEffect 被赋值，obj.a 触发 代理对象的get 操作",
			"baseline": 91,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "let obj = reactive({ a: 1 }), 对象被代理。\neffect(() => {\n    b = obj.a+1\n})这里 fn 执行一次，activeEffect 被赋值，obj.a 触发 代理对象的get 操作"
		},
		{
			"type": "rectangle",
			"version": 463,
			"versionNonce": 2064526950,
			"isDeleted": false,
			"id": "uzXTEN10b1i-rWmz9kXtZ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 88.38506669843412,
			"y": 141.32860010087393,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 186,
			"height": 58,
			"seed": 632363514,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "rYwvA1Xc",
					"type": "text"
				},
				{
					"id": "VqTQlH84Tx4pDr7XNJJSI",
					"type": "arrow"
				},
				{
					"id": "M85gXNBsDMDKjfztEZMx0",
					"type": "arrow"
				}
			],
			"updated": 1659194217261,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 415,
			"versionNonce": 1351972168,
			"isDeleted": false,
			"id": "rYwvA1Xc",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 93.38506669843412,
			"y": 157.82860010087393,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 176,
			"height": 25,
			"seed": 486611622,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659254854777,
			"link": null,
			"locked": false,
			"fontSize": 20.035960080595355,
			"fontFamily": 1,
			"text": "set 触发依赖",
			"rawText": "set 触发依赖",
			"baseline": 18,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "uzXTEN10b1i-rWmz9kXtZ",
			"originalText": "set 触发依赖"
		},
		{
			"type": "rectangle",
			"version": 437,
			"versionNonce": 539296678,
			"isDeleted": false,
			"id": "gW8rzFLYlPHJYHftrFPQq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 409.27915515403606,
			"y": -112.7753675251418,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 496.2621188499085,
			"height": 178.77794185254396,
			"seed": 1450964858,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "XM4uNrn2XZtfsQJLyuMPM",
					"type": "arrow"
				}
			],
			"updated": 1659194213961,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 212,
			"versionNonce": 1902057702,
			"isDeleted": false,
			"id": "p7tb60Xq",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 458.3787826726964,
			"y": -86.81349106802554,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 376,
			"height": 103,
			"seed": 620690746,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659194428588,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "1. track 收集依赖track( target, key ）\n  targetMap: {target: {key: depSet}}\n\n2. depSet.add( activeEffect )",
			"rawText": "1. track 收集依赖track( target, key ）\n  targetMap: {target: {key: depSet}}\n\n2. depSet.add( activeEffect )",
			"baseline": 96,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "1. track 收集依赖track( target, key ）\n  targetMap: {target: {key: depSet}}\n\n2. depSet.add( activeEffect )"
		},
		{
			"type": "text",
			"version": 350,
			"versionNonce": 1718852710,
			"isDeleted": false,
			"id": "sYqrY8gu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 458.8403520295715,
			"y": 23.126028970818652,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 410,
			"height": 25,
			"seed": 721143526,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659194433335,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "  depSet: [ effect1, effect2, effect3... ]",
			"rawText": "  depSet: [ effect1, effect2, effect3... ]",
			"baseline": 18,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "  depSet: [ effect1, effect2, effect3... ]"
		},
		{
			"type": "text",
			"version": 226,
			"versionNonce": 293208442,
			"isDeleted": false,
			"id": "ahlf5yWx",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 561.5585538695914,
			"y": 224.54586169078368,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 287,
			"height": 28,
			"seed": 89453606,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659194165896,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "trigger 触发依赖, 遍历 depSet",
			"rawText": "trigger 触发依赖, 遍历 depSet",
			"baseline": 21,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "trigger 触发依赖, 遍历 depSet"
		},
		{
			"type": "rectangle",
			"version": 321,
			"versionNonce": 1799844262,
			"isDeleted": false,
			"id": "9_6J_Su-OskYYwCDFPDiJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 526.7144228928539,
			"y": 202.2057803159429,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 365.8504313428491,
			"height": 144.482897544455,
			"seed": 1840733670,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "M85gXNBsDMDKjfztEZMx0",
					"type": "arrow"
				}
			],
			"updated": 1659194217261,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 231,
			"versionNonce": 1685045818,
			"isDeleted": false,
			"id": "IYIu5HKd",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 569.4237460329925,
			"y": 278.10718489509475,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 213,
			"height": 50,
			"seed": 1741982374,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659194165896,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "1. effect.scheduler() ?\n2. effect.run() ?",
			"rawText": "1. effect.scheduler() ?\n2. effect.run() ?",
			"baseline": 43,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "1. effect.scheduler() ?\n2. effect.run() ?"
		},
		{
			"type": "arrow",
			"version": 82,
			"versionNonce": 1111883080,
			"isDeleted": false,
			"id": "J8mEHj6eF5l8At8bhA1TJ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -304.97319440577996,
			"y": -61.84088078869307,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 83.19584526264836,
			"height": 124.36498539922252,
			"seed": 1171937786,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659254926863,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "5FlTGczH",
				"gap": 11.800421767659543,
				"focus": -0.8035248940148411
			},
			"endBinding": {
				"elementId": "KHA9MuA5lBboBBQHJUlyM",
				"gap": 3.5475303103273745,
				"focus": -0.5816065650879032
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					83.19584526264836,
					124.36498539922252
				]
			]
		},
		{
			"type": "arrow",
			"version": 107,
			"versionNonce": 561426504,
			"isDeleted": false,
			"id": "FbGgyFASX4t22lSjSmlso",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -45.08708960731917,
			"y": 63.5067648400366,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 126.80507535690732,
			"height": 49.055621222504755,
			"seed": 2115127418,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659254926866,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "KHA9MuA5lBboBBQHJUlyM",
				"gap": 7.163093964079508,
				"focus": 0.01196198858996362
			},
			"endBinding": {
				"elementId": "in9WFARo9kTiODCweCTED",
				"gap": 1,
				"focus": 0.545513408489759
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					126.80507535690732,
					-49.055621222504755
				]
			]
		},
		{
			"type": "arrow",
			"version": 102,
			"versionNonce": 301872456,
			"isDeleted": false,
			"id": "VqTQlH84Tx4pDr7XNJJSI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -43.36513966933968,
			"y": 129.9218961020049,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 124.93972187520036,
			"height": 39.86578082074038,
			"seed": 1573301670,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659254926867,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "KHA9MuA5lBboBBQHJUlyM",
				"gap": 8.450424937562616,
				"focus": 0.037349695548633176
			},
			"endBinding": {
				"elementId": "uzXTEN10b1i-rWmz9kXtZ",
				"gap": 6.810484492573437,
				"focus": -0.5335647342212446
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					124.93972187520036,
					39.86578082074038
				]
			]
		},
		{
			"type": "arrow",
			"version": 79,
			"versionNonce": 784951112,
			"isDeleted": false,
			"id": "XM4uNrn2XZtfsQJLyuMPM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 286.5798333842527,
			"y": 11.416843380309725,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 115.35144485246764,
			"height": 25.34955023258238,
			"seed": 1682249894,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659254926866,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "in9WFARo9kTiODCweCTED",
				"gap": 9.861847634664514,
				"focus": 0.43864776383072784
			},
			"endBinding": {
				"elementId": "gW8rzFLYlPHJYHftrFPQq",
				"gap": 7.347876917315716,
				"focus": 0.32442191407973797
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					115.35144485246764,
					-25.34955023258238
				]
			]
		},
		{
			"type": "arrow",
			"version": 70,
			"versionNonce": 236473416,
			"isDeleted": false,
			"id": "M85gXNBsDMDKjfztEZMx0",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 281.32335448412937,
			"y": 172.90348268271916,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 235.16331796194982,
			"height": 94.81725085210692,
			"seed": 593162682,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659254926868,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "uzXTEN10b1i-rWmz9kXtZ",
				"gap": 6.938287785695252,
				"focus": -0.5672402443917215
			},
			"endBinding": {
				"elementId": "9_6J_Su-OskYYwCDFPDiJ",
				"gap": 10.227750446774735,
				"focus": -0.48735635876310607
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					235.16331796194982,
					94.81725085210692
				]
			]
		},
		{
			"type": "arrow",
			"version": 261,
			"versionNonce": 710482248,
			"isDeleted": false,
			"id": "QE-CTn92ZnRYR8dPPiMUz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -59.84889425728281,
			"y": -318.120837382779,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 158.2937139998546,
			"height": 5.114796123425776,
			"seed": 1683907514,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659254926865,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "Xa4MjZXbcPADBP8Tp5NIV",
				"gap": 6.652807630471882,
				"focus": 0.08714217754727895
			},
			"endBinding": {
				"elementId": "lOM8Q4RlaK2QMTKzE49YX",
				"gap": 14.051529236564708,
				"focus": 0.10510606022689302
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					158.2937139998546,
					-5.114796123425776
				]
			]
		},
		{
			"type": "arrow",
			"version": 119,
			"versionNonce": 246234696,
			"isDeleted": false,
			"id": "G7Fn3gAwks1hK8oQ5nKRI",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 332.37517017346613,
			"y": -199.40481213236774,
			"strokeColor": "#d9480f",
			"backgroundColor": "transparent",
			"width": 121.87597954440275,
			"height": 167.93302976094412,
			"seed": 307823270,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659254926867,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "lOM8Q4RlaK2QMTKzE49YX",
				"gap": 16,
				"focus": 0.18618629007781845
			},
			"endBinding": {
				"elementId": "in9WFARo9kTiODCweCTED",
				"gap": 15.301222240151276,
				"focus": -0.01160587854970299
			},
			"lastCommittedPoint": null,
			"startArrowhead": null,
			"endArrowhead": "arrow",
			"points": [
				[
					0,
					0
				],
				[
					-121.87597954440275,
					167.93302976094412
				]
			]
		},
		{
			"type": "rectangle",
			"version": 744,
			"versionNonce": 245509192,
			"isDeleted": false,
			"id": "ySNCmd1Wl0G3rI8N1vzjy",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -223.36405138598036,
			"y": 387.42906318589957,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 169.09417724609375,
			"height": 64.1572265625,
			"seed": 1679696456,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "neNYaDY8",
					"type": "text"
				},
				{
					"id": "J8mEHj6eF5l8At8bhA1TJ",
					"type": "arrow"
				},
				{
					"id": "FbGgyFASX4t22lSjSmlso",
					"type": "arrow"
				},
				{
					"id": "VqTQlH84Tx4pDr7XNJJSI",
					"type": "arrow"
				},
				{
					"id": "WWoLnxAVGZnmkj1EAZo6J",
					"type": "arrow"
				},
				{
					"id": "I_7qsC2r8kx_RAAsGxNSS",
					"type": "arrow"
				}
			],
			"updated": 1659255181622,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 689,
			"versionNonce": 1167942456,
			"isDeleted": false,
			"id": "neNYaDY8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -218.36405138598036,
			"y": 407.00767646714957,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 159.09417724609375,
			"height": 25,
			"seed": 235013688,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659254854778,
			"link": null,
			"locked": false,
			"fontSize": 20.023699405570582,
			"fontFamily": 1,
			"text": "渲染组件",
			"rawText": "渲染组件",
			"baseline": 18,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "ySNCmd1Wl0G3rI8N1vzjy",
			"originalText": "渲染组件"
		},
		{
			"type": "rectangle",
			"version": 643,
			"versionNonce": 664665160,
			"isDeleted": false,
			"id": "cDip7Z23aZ8onONU9TS9g",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -34.80705133172694,
			"y": 743.1556197809418,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 186,
			"height": 58,
			"seed": 1328974152,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "p1mC4h8x",
					"type": "text"
				},
				{
					"id": "VqTQlH84Tx4pDr7XNJJSI",
					"type": "arrow"
				},
				{
					"id": "M85gXNBsDMDKjfztEZMx0",
					"type": "arrow"
				},
				{
					"id": "N-m8ULGkJGUAfsjnZZAbh",
					"type": "arrow"
				},
				{
					"id": "rgYGEE5yxFgWmJQOmNfb7",
					"type": "arrow"
				},
				{
					"id": "dGqxrgMJyoPtj_PG-v9M1",
					"type": "arrow"
				}
			],
			"updated": 1659255161101,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 604,
			"versionNonce": 910082632,
			"isDeleted": false,
			"id": "p1mC4h8x",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -29.80705133172694,
			"y": 759.6556197809418,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 176,
			"height": 25,
			"seed": 1279758136,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659254942706,
			"link": null,
			"locked": false,
			"fontSize": 20.035960080595355,
			"fontFamily": 1,
			"text": "processComponent",
			"rawText": "processComponent",
			"baseline": 18,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "cDip7Z23aZ8onONU9TS9g",
			"originalText": "processComponent"
		},
		{
			"type": "rectangle",
			"version": 687,
			"versionNonce": 686683464,
			"isDeleted": false,
			"id": "c3iZbRXQ0XkXcukFW84ef",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 297.4343121936637,
			"y": 567.9362289118012,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 186,
			"height": 58,
			"seed": 1372296776,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "r1Hmo8jF",
					"type": "text"
				},
				{
					"id": "VqTQlH84Tx4pDr7XNJJSI",
					"type": "arrow"
				},
				{
					"id": "M85gXNBsDMDKjfztEZMx0",
					"type": "arrow"
				},
				{
					"id": "N-m8ULGkJGUAfsjnZZAbh",
					"type": "arrow"
				},
				{
					"id": "_CAL1o6pwyXM5Ktpv2sqo",
					"type": "arrow"
				},
				{
					"id": "ZD1VlrQCk7GO2AIHKNMZA",
					"type": "arrow"
				}
			],
			"updated": 1659255135653,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 672,
			"versionNonce": 1710145352,
			"isDeleted": false,
			"id": "r1Hmo8jF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 302.4343121936637,
			"y": 584.4362289118012,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 176,
			"height": 25,
			"seed": 857068088,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659254868947,
			"link": null,
			"locked": false,
			"fontSize": 20.035960080595355,
			"fontFamily": 1,
			"text": "初始化组件",
			"rawText": "初始化组件",
			"baseline": 18,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "c3iZbRXQ0XkXcukFW84ef",
			"originalText": "初始化组件"
		},
		{
			"type": "rectangle",
			"version": 801,
			"versionNonce": 1046086456,
			"isDeleted": false,
			"id": "O4o5Vx3EtALsAM5aJSd5r",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 307.00663885381994,
			"y": 885.7067672418793,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 186,
			"height": 58,
			"seed": 1809555272,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "BBnhh9eS",
					"type": "text"
				},
				{
					"id": "VqTQlH84Tx4pDr7XNJJSI",
					"type": "arrow"
				},
				{
					"id": "M85gXNBsDMDKjfztEZMx0",
					"type": "arrow"
				},
				{
					"id": "4p7Pmtx9410l1qiJ2DlBf",
					"type": "arrow"
				}
			],
			"updated": 1659255139728,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 798,
			"versionNonce": 503745848,
			"isDeleted": false,
			"id": "BBnhh9eS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 312.00663885381994,
			"y": 902.2067672418793,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 176,
			"height": 25,
			"seed": 145152312,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [],
			"updated": 1659254866613,
			"link": null,
			"locked": false,
			"fontSize": 20.035960080595355,
			"fontFamily": 1,
			"text": "组件更新",
			"rawText": "组件更新",
			"baseline": 18,
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "O4o5Vx3EtALsAM5aJSd5r",
			"originalText": "组件更新"
		},
		{
			"id": "Yo55Du3oM7ONwMAaEFwAL",
			"type": "rectangle",
			"x": 641.5436261585074,
			"y": 402.05295864812933,
			"width": 811.4956054687498,
			"height": 169.17221069335935,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 1677082440,
			"version": 213,
			"versionNonce": 1775410232,
			"isDeleted": false,
			"boundElements": [
				{
					"id": "_CAL1o6pwyXM5Ktpv2sqo",
					"type": "arrow"
				}
			],
			"updated": 1659255132258,
			"link": null,
			"locked": false
		},
		{
			"id": "AAZNshnL",
			"type": "text",
			"x": 664.2628034046012,
			"y": 433.38184658758246,
			"width": 788,
			"height": 112,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 1521548616,
			"version": 110,
			"versionNonce": 677947704,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255087832,
			"link": null,
			"locked": false,
			"text": "1. 初始化信息 props slots \n2. setupStatefulComponent处理组件状态，\n2-1. 包括组件实例挂载setupResult（instance.setState = proxyRef(setupResult)）\n2-2. 包括组件实例添加render 函数（template ? component.render ? ）",
			"rawText": "1. 初始化信息 props slots \n2. setupStatefulComponent处理组件状态，\n2-1. 包括组件实例挂载setupResult（instance.setState = proxyRef(setupResult)）\n2-2. 包括组件实例添加render 函数（template ? component.render ? ）",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"baseline": 105,
			"containerId": null,
			"originalText": "1. 初始化信息 props slots \n2. setupStatefulComponent处理组件状态，\n2-1. 包括组件实例挂载setupResult（instance.setState = proxyRef(setupResult)）\n2-2. 包括组件实例添加render 函数（template ? component.render ? ）"
		},
		{
			"id": "Dx46OsTv",
			"type": "text",
			"x": 672.8616803577262,
			"y": 641.9712325739106,
			"width": 185,
			"height": 25,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 270635592,
			"version": 53,
			"versionNonce": 1001174088,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255096462,
			"link": null,
			"locked": false,
			"text": "setupRenderEffect",
			"rawText": "setupRenderEffect",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"baseline": 18,
			"containerId": null,
			"originalText": "setupRenderEffect"
		},
		{
			"id": "UjYhMrDb",
			"type": "text",
			"x": 668.9579938342887,
			"y": 676.4684249567231,
			"width": 605,
			"height": 103,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 1518689608,
			"version": 274,
			"versionNonce": 900879432,
			"isDeleted": false,
			"boundElements": [
				{
					"id": "JK5olTVpusqwPnwxvZxa4",
					"type": "arrow"
				}
			],
			"updated": 1659255148336,
			"link": null,
			"locked": false,
			"text": "\n1. effect( fn )\n2. 初始化 执行render 进行递归 patch，如果是element 进行渲染 \n3. instance.update = effeft(fn, {scheduler})",
			"rawText": "\n1. effect( fn )\n2. 初始化 执行render 进行递归 patch，如果是element 进行渲染 \n3. instance.update = effeft(fn, {scheduler})",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"baseline": 96,
			"containerId": null,
			"originalText": "\n1. effect( fn )\n2. 初始化 执行render 进行递归 patch，如果是element 进行渲染 \n3. instance.update = effeft(fn, {scheduler})"
		},
		{
			"type": "rectangle",
			"version": 320,
			"versionNonce": 823135304,
			"isDeleted": false,
			"id": "9nMxpX85sKp0AQg5WfZ35",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 640.4493268421011,
			"y": 625.312403838559,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 811.4956054687498,
			"height": 169.17221069335935,
			"seed": 153991496,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"boundElements": [
				{
					"id": "ZD1VlrQCk7GO2AIHKNMZA",
					"type": "arrow"
				}
			],
			"updated": 1659255135653,
			"link": null,
			"locked": false
		},
		{
			"id": "yB1Wdjpq",
			"type": "text",
			"x": 659.9235089710074,
			"y": 901.6771041559418,
			"width": 169,
			"height": 25,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 738147144,
			"version": 98,
			"versionNonce": 105808200,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255052990,
			"link": null,
			"locked": false,
			"text": "instance.update()",
			"rawText": "instance.update()",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"baseline": 18,
			"containerId": null,
			"originalText": "instance.update()"
		},
		{
			"id": "jRMhEn-sZb1A2x_2va5s3",
			"type": "rectangle",
			"x": 646.8649152210074,
			"y": 885.4199020075043,
			"width": 203.39654541015625,
			"height": 58.99346923828125,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 1819742008,
			"version": 140,
			"versionNonce": 1715027272,
			"isDeleted": false,
			"boundElements": [
				{
					"id": "4p7Pmtx9410l1qiJ2DlBf",
					"type": "arrow"
				},
				{
					"id": "JK5olTVpusqwPnwxvZxa4",
					"type": "arrow"
				}
			],
			"updated": 1659255148336,
			"link": null,
			"locked": false
		},
		{
			"id": "v3HvzdqO",
			"type": "text",
			"x": 100.23440679815587,
			"y": 385.11765591375433,
			"width": 286,
			"height": 78,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 959019080,
			"version": 290,
			"versionNonce": 1461007944,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659254994322,
			"link": null,
			"locked": false,
			"text": "入口 main.js\ncreateApp(App).mount(#app)\ncreateApp -- render -- patch",
			"rawText": "入口 main.js\ncreateApp(App).mount(#app)\ncreateApp -- render -- patch",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"baseline": 71,
			"containerId": null,
			"originalText": "入口 main.js\ncreateApp(App).mount(#app)\ncreateApp -- render -- patch"
		},
		{
			"id": "85_UDIu0sCU3FqVjQ2MhA",
			"type": "rectangle",
			"x": 83.31189092901525,
			"y": 359.0611983942231,
			"width": 320.0113220214844,
			"height": 135.35772705078125,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 932674616,
			"version": 243,
			"versionNonce": 1225850680,
			"isDeleted": false,
			"boundElements": [
				{
					"id": "dGqxrgMJyoPtj_PG-v9M1",
					"type": "arrow"
				},
				{
					"id": "WWoLnxAVGZnmkj1EAZo6J",
					"type": "arrow"
				}
			],
			"updated": 1659255176355,
			"link": null,
			"locked": false
		},
		{
			"id": "N-m8ULGkJGUAfsjnZZAbh",
			"type": "arrow",
			"x": 159.04687628057775,
			"y": 770.8823043512543,
			"width": 144.02719116210938,
			"height": 144.19818115234375,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 463399752,
			"version": 120,
			"versionNonce": 345411400,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255106970,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					144.02719116210938,
					-144.19818115234375
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "cDip7Z23aZ8onONU9TS9g",
				"focus": 0.8164770427790504,
				"gap": 7.8539276123046875
			},
			"endBinding": {
				"elementId": "c3iZbRXQ0XkXcukFW84ef",
				"focus": 0.47265474753049513,
				"gap": 1
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "rgYGEE5yxFgWmJQOmNfb7",
			"type": "arrow",
			"x": 156.18164190557775,
			"y": 798.4459640192231,
			"width": 157.02383422851562,
			"height": 94.53314208984375,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 1577985848,
			"version": 56,
			"versionNonce": 151795016,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255122257,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					157.02383422851562,
					94.53314208984375
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "cDip7Z23aZ8onONU9TS9g",
				"focus": -0.3847780595361251,
				"gap": 4.9886932373046875
			},
			"endBinding": null,
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "_CAL1o6pwyXM5Ktpv2sqo",
			"type": "arrow",
			"x": 491.2450879504996,
			"y": 593.3176681207856,
			"width": 139.8714599609375,
			"height": 72.50811767578125,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 371817528,
			"version": 63,
			"versionNonce": 133901384,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255132258,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					139.8714599609375,
					-72.50811767578125
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "c3iZbRXQ0XkXcukFW84ef",
				"focus": 0.6299781492895496,
				"gap": 7.8107757568359375
			},
			"endBinding": {
				"elementId": "Yo55Du3oM7ONwMAaEFwAL",
				"focus": 0.6156569182293359,
				"gap": 10.427078247070256
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "ZD1VlrQCk7GO2AIHKNMZA",
			"type": "arrow",
			"x": 490.2811597278434,
			"y": 615.6487838434418,
			"width": 144.263427734375,
			"height": 87.316650390625,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 1197368136,
			"version": 61,
			"versionNonce": 487383864,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255135653,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					144.263427734375,
					87.316650390625
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "c3iZbRXQ0XkXcukFW84ef",
				"focus": -0.48916709764627797,
				"gap": 6.8468475341796875
			},
			"endBinding": {
				"elementId": "9nMxpX85sKp0AQg5WfZ35",
				"focus": -0.7336350308295148,
				"gap": 5.9047393798828125
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "4p7Pmtx9410l1qiJ2DlBf",
			"type": "arrow",
			"x": 498.3208325794059,
			"y": 920.2048751520356,
			"width": 142.77117919921875,
			"height": 1.20440673828125,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 987185992,
			"version": 62,
			"versionNonce": 1856302152,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255139728,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					142.77117919921875,
					-1.20440673828125
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "O4o5Vx3EtALsAM5aJSd5r",
				"focus": 0.21244171423074296,
				"gap": 5.3141937255859375
			},
			"endBinding": {
				"elementId": "jRMhEn-sZb1A2x_2va5s3",
				"focus": -0.10466972308580468,
				"gap": 5.7729034423828125
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "JK5olTVpusqwPnwxvZxa4",
			"type": "arrow",
			"x": 743.2160352161246,
			"y": 872.8455611871918,
			"width": 30.970703125,
			"height": 90.97607421875,
			"angle": 0,
			"strokeColor": "#d9480f",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 1009554744,
			"version": 173,
			"versionNonce": 1504095544,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255155039,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					30.970703125,
					-90.97607421875
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "jRMhEn-sZb1A2x_2va5s3",
				"focus": -0.17602757988187873,
				"gap": 12.5743408203125
			},
			"endBinding": {
				"elementId": "UjYhMrDb",
				"focus": 0.5590750051567855,
				"gap": 2.40106201171875
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "dGqxrgMJyoPtj_PG-v9M1",
			"type": "arrow",
			"x": 152.96243414190587,
			"y": 512.7977096246918,
			"width": 89.55316162109375,
			"height": 225.1669921875,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 197936696,
			"version": 43,
			"versionNonce": 1839765304,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255171384,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					-89.55316162109375,
					225.1669921875
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "85_UDIu0sCU3FqVjQ2MhA",
				"focus": 0.3002756260105374,
				"gap": 18.3787841796875
			},
			"endBinding": {
				"elementId": "cDip7Z23aZ8onONU9TS9g",
				"focus": -0.0801850273192271,
				"gap": 5.19091796875
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "WWoLnxAVGZnmkj1EAZo6J",
			"type": "arrow",
			"x": -42.096449525086314,
			"y": 419.5701095270356,
			"width": 117.202392578125,
			"height": 8.80926513671875,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 1543565368,
			"version": 77,
			"versionNonce": 1064180040,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255176355,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					117.202392578125,
					8.80926513671875
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "ySNCmd1Wl0G3rI8N1vzjy",
				"focus": -0.18752838305860822,
				"gap": 12.173424614800297
			},
			"endBinding": {
				"elementId": "85_UDIu0sCU3FqVjQ2MhA",
				"focus": -0.17919219613475781,
				"gap": 8.205947875976562
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "I_7qsC2r8kx_RAAsGxNSS",
			"type": "arrow",
			"x": -367.25471368524256,
			"y": -35.530476410464416,
			"width": 149.329833984375,
			"height": 413.98699951171875,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 2115786808,
			"version": 70,
			"versionNonce": 799589176,
			"isDeleted": false,
			"boundElements": null,
			"updated": 1659255181622,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					149.329833984375,
					413.98699951171875
				]
			],
			"lastCommittedPoint": null,
			"startBinding": {
				"elementId": "AVLlmSPGYnCocjRFc60TF",
				"focus": -0.012840476213681154,
				"gap": 10.794727269418956
			},
			"endBinding": {
				"elementId": "ySNCmd1Wl0G3rI8N1vzjy",
				"focus": -0.6689710230119951,
				"gap": 8.972540084645232
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		},
		{
			"id": "5DbeXEucwwZYvX_Cu3Hzy",
			"type": "arrow",
			"x": 137.36117681768712,
			"y": 778.5749313043793,
			"width": 24.257080078125,
			"height": 15.06805419921875,
			"angle": 0,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "round",
			"seed": 278226504,
			"version": 153,
			"versionNonce": 2127605304,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1659255117954,
			"link": null,
			"locked": false,
			"points": [
				[
					0,
					0
				],
				[
					24.257080078125,
					15.06805419921875
				]
			],
			"lastCommittedPoint": [
				24.257080078125,
				15.06805419921875
			],
			"startBinding": null,
			"endBinding": {
				"elementId": "cDip7Z23aZ8onONU9TS9g",
				"focus": 0.4927808364961013,
				"gap": 10.425308227539062
			},
			"startArrowhead": null,
			"endArrowhead": "arrow"
		}
	],
	"appState": {
		"theme": "light",
		"viewBackgroundColor": "#f4fce3",
		"currentItemStrokeColor": "#000000",
		"currentItemBackgroundColor": "transparent",
		"currentItemFillStyle": "hachure",
		"currentItemStrokeWidth": 1,
		"currentItemStrokeStyle": "solid",
		"currentItemRoughness": 1,
		"currentItemOpacity": 100,
		"currentItemFontFamily": 1,
		"currentItemFontSize": 20,
		"currentItemTextAlign": "left",
		"currentItemStrokeSharpness": "sharp",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"currentItemLinearStrokeSharpness": "round",
		"gridSize": null,
		"colorPalette": {}
	},
	"files": {}
}
```
%%