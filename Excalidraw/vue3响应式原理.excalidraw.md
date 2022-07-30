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
			"version": 223,
			"versionNonce": 1129593510,
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
				}
			],
			"updated": 1659194194497,
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
			"version": 493,
			"versionNonce": 876989542,
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
			"updated": 1659194350963,
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
			"version": 288,
			"versionNonce": 315209914,
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
			"updated": 1659194350968,
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
			"version": 561,
			"versionNonce": 400248742,
			"isDeleted": false,
			"id": "-uJfE8MHFGoCtbT8JUHff",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -288.40425199014385,
			"y": -134.46786914496113,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 95.46196094893148,
			"height": 149.48864322293326,
			"seed": 70741734,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659194350965,
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
					95.46196094893148,
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
			"version": 410,
			"versionNonce": 939951718,
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
			"updated": 1659194350969,
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
			"version": 60,
			"versionNonce": 2134086330,
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
			"updated": 1659194350962,
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
			"version": 63,
			"versionNonce": 274472486,
			"isDeleted": false,
			"id": "FbGgyFASX4t22lSjSmlso",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -45.08708960731917,
			"y": 63.50676484003662,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 126.80507535690732,
			"height": 49.05562122250477,
			"seed": 2115127418,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659194350966,
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
					-49.05562122250477
				]
			]
		},
		{
			"type": "arrow",
			"version": 58,
			"versionNonce": 1766232442,
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
			"updated": 1659194350968,
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
			"version": 57,
			"versionNonce": 1220634982,
			"isDeleted": false,
			"id": "XM4uNrn2XZtfsQJLyuMPM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 286.5798333842527,
			"y": 11.416843380309729,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 115.35144485246764,
			"height": 25.34955023258238,
			"seed": 1682249894,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659194350967,
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
			"version": 48,
			"versionNonce": 875188794,
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
			"updated": 1659194350969,
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
			"version": 239,
			"versionNonce": 1281256166,
			"isDeleted": false,
			"id": "QE-CTn92ZnRYR8dPPiMUz",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -59.84889425728281,
			"y": -318.15785417239374,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 158.2937139998546,
			"height": 5.103730868328739,
			"seed": 1683907514,
			"groupIds": [],
			"strokeSharpness": "round",
			"boundElements": [],
			"updated": 1659194350965,
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
					-5.103730868328739
				]
			]
		},
		{
			"type": "arrow",
			"version": 97,
			"versionNonce": 886787238,
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
			"updated": 1659194350967,
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
			"id": "hdvQDmI_fvCmDGW3JbR-X",
			"type": "text",
			"x": 840.6602033069449,
			"y": -58.28805920993398,
			"width": 11,
			"height": 75,
			"angle": 0,
			"strokeColor": "#d9480f",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"strokeSharpness": "sharp",
			"seed": 521067878,
			"version": 5,
			"versionNonce": 852966374,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1659194419859,
			"link": null,
			"locked": false,
			"text": "\n\n",
			"rawText": "\n\n",
			"fontSize": 20,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"baseline": 68,
			"containerId": null,
			"originalText": "\n\n"
		}
	],
	"appState": {
		"theme": "light",
		"viewBackgroundColor": "#f4fce3",
		"currentItemStrokeColor": "#d9480f",
		"currentItemBackgroundColor": "transparent",
		"currentItemFillStyle": "hachure",
		"currentItemStrokeWidth": 4,
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