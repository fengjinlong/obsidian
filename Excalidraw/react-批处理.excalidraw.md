---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
useState 触发更新 执行 dispatchsetState ^gmvqQM9x

createRoot 触发更新 执行 updateContainer ^uxAbGGED

创建 update 和 lane ^61vsFVWI

scheduleUpdateOnFiber ^1XrWcTY9

同步更新 ^jF5ojb3J

renderRoot ^qVFaSPcV

commitRoot ^Atod23nN

lane 调度 ^g7umxdqQ

同一个 fiber 会有多个 update 
 把fiber 的 pendign 结构变成 链表
结构
a - a
b - a - b
c - a - b -c ^SE4IHBbu

setState * 3 ^jBDtKzKS

1. 每个更新都拥有优先级
2. 合并一个宏任务/微任务中触发的所有更新
3. 算法决定哪个优先级优先进入render阶段 ^Ndo13qkm

mount biber 时候，添加更新 带有  lane ^sInVdxHu

interface Update<State> {
    action: Action<State>;
    lane: Lane;
    next: Update<any> | null;
} ^VD2ZtwGh

消费 update 就是消费 lane
 ^upRldUP1

在 fiberRootNode 上记录所有没有别消耗 lane 的集合，pendingLanes

fiberRootNode 上本次消耗的 lane, finishedLane ^RxBa4QA2

## 怎么选一个 lane ^S0Kl2TuQ

scheduleUpdateOnFiber(fiber: FiberNode, lane: Lane)  ^KZw2sPNi

1. 当前更新的 lane（不同的类型） 记录到 fiberRootNode 的 lanes 集合
2. 调度流程
3. 选一个lane 就是选出优先级最高的 lane 也就是二进制最右边的 1
    1. 这个被选的 lane 如果是同步的，那么采用微任务调度（）
        queueMicrotask -> promisr -> setTimeout
    2. 否则，react 采用宏任务调度 ^URlDgPyy

虽然每次更新都回调用这个流程
全局 存在三个 update
[ u1, u2, u3]
每次触发一个更新，都是遍历一下 arr 并添加到微任务
第一次更新，会把三个回调放进 微任务
后两次，由于哨兵的存在，不会重复添加到微任务 ^a4O4PWJF

1. 创建wip fiberNode树，初始化全局的wipRootRenderLane
通过这个方法 prepareFreshStack(root, lane);

2. workLoop 执行 beginwork ^1qXl9zM6

## render 阶段 ^6chygW35

beginWork ^BrzZS2N4

commitRoot(root)
    1.移出当前的 lane ^xqfiTrPX

### commit 阶段  销毁 lane ^mCUhoYoI


                /**
                 * padding = a -> b -> c -> a 当前 fiber的update链表
                 * renderLane 正在渲染的lane，这个 lane 是在 render (执行workLoop) 之前就确定的
                 * 如果update的lane和renderLane相同，才会执行update
                 *
                 * a 完毕，递归进入 b,
                 * b 完毕，递归进入 c,
                 * c 完毕，递归进入 a a === first，退出循环
                 */ ^JZCavAcV

updateFunctionComponent ^6rZbms3A

updateHostRoot ^f0J1T5Jr

   processUpdateQueue 
 ^CplKgBB6

## scheduleUpdateOnFiber 调度 ^geJxqfHS


# Embedded files
3914ae199114c2f16a7825edc306c957aea0cbdc: [[Pasted Image 20230320154506_816.png]]

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/1.8.20",
	"elements": [
		{
			"type": "image",
			"version": 418,
			"versionNonce": 1324718593,
			"isDeleted": false,
			"id": "NapaG1xPkCxKiMXgpadOO",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -632.8085804832908,
			"y": 193.87086320714445,
			"strokeColor": "transparent",
			"backgroundColor": "transparent",
			"width": 663.6213680152014,
			"height": 531.3579425843939,
			"seed": 1247750728,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [
				{
					"id": "ixX3eWK3Ng-pndaKL0e1A",
					"type": "arrow"
				}
			],
			"updated": 1679327774534,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"status": "pending",
			"fileId": "3914ae199114c2f16a7825edc306c957aea0cbdc",
			"scale": [
				1,
				1
			]
		},
		{
			"type": "rectangle",
			"version": 663,
			"versionNonce": 338282789,
			"isDeleted": false,
			"id": "NPdBOp78jytemf9eXLFPi",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -968.6275233821464,
			"y": -590.9171858147619,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 523.4433765093879,
			"height": 158.17439363742426,
			"seed": 1073076367,
			"groupIds": [
				"EBLWP1-Z46QqNB-6gA4iI",
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "VU2biXjssRE6r_KdJRXPS",
					"type": "arrow"
				}
			],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 341,
			"versionNonce": 1891589253,
			"isDeleted": false,
			"id": "gmvqQM9x",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -933.8316288648289,
			"y": -561.1998725485598,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 436.40625,
			"height": 24,
			"seed": 405712801,
			"groupIds": [
				"EBLWP1-Z46QqNB-6gA4iI",
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "useState 触发更新 执行 dispatchsetState",
			"rawText": "useState 触发更新 执行 dispatchsetState",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "useState 触发更新 执行 dispatchsetState"
		},
		{
			"type": "text",
			"version": 346,
			"versionNonce": 47602251,
			"isDeleted": false,
			"id": "uxAbGGED",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -931.788970131932,
			"y": -497.2500763752753,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 448.125,
			"height": 24,
			"seed": 1126095233,
			"groupIds": [
				"EBLWP1-Z46QqNB-6gA4iI",
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "createRoot 触发更新 执行 updateContainer",
			"rawText": "createRoot 触发更新 执行 updateContainer",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "createRoot 触发更新 执行 updateContainer"
		},
		{
			"type": "rectangle",
			"version": 471,
			"versionNonce": 754661,
			"isDeleted": false,
			"id": "SrqJ19eUsMpE37FAunrkB",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -314.23635782724455,
			"y": -543.283950886994,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 244,
			"height": 58,
			"seed": 2124681551,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "61vsFVWI"
				},
				{
					"id": "VU2biXjssRE6r_KdJRXPS",
					"type": "arrow"
				},
				{
					"id": "tNbADikarkU3tejzZ4VUA",
					"type": "arrow"
				}
			],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 453,
			"versionNonce": 1444659013,
			"isDeleted": false,
			"id": "61vsFVWI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -298.9390784693344,
			"y": -526.283950886994,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 213.4054412841797,
			"height": 24,
			"seed": 1265753857,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"fontSize": 20.101854610774257,
			"fontFamily": 3,
			"text": "创建 update 和 lane",
			"rawText": "创建 update 和 lane",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "SrqJ19eUsMpE37FAunrkB",
			"originalText": "创建 update 和 lane"
		},
		{
			"type": "arrow",
			"version": 936,
			"versionNonce": 665186601,
			"isDeleted": false,
			"id": "VU2biXjssRE6r_KdJRXPS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -437.9663993311508,
			"y": -514.5425226205992,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 117.96435546875,
			"height": 3.0946690875283593,
			"seed": 519431361,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1683637980816,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "NPdBOp78jytemf9eXLFPi",
				"gap": 7.21774754160765,
				"focus": 0.050525244138283874
			},
			"endBinding": {
				"elementId": "SrqJ19eUsMpE37FAunrkB",
				"gap": 5.76568603515625,
				"focus": 0.20822748259531484
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
					117.96435546875,
					-3.0946690875283593
				]
			]
		},
		{
			"type": "rectangle",
			"version": 541,
			"versionNonce": 692948645,
			"isDeleted": false,
			"id": "S9f3GZB4AThXPYF1daEZG",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 89.6987618016617,
			"y": -557.8350067951972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 320,
			"height": 62,
			"seed": 817020559,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "1XrWcTY9"
				},
				{
					"id": "tNbADikarkU3tejzZ4VUA",
					"type": "arrow"
				},
				{
					"id": "ZIs0-ufxaWTEs9lsAWt8d",
					"type": "arrow"
				},
				{
					"id": "189aMjaKyR9kUjqOaUv33",
					"type": "arrow"
				}
			],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 486,
			"versionNonce": 1344006501,
			"isDeleted": false,
			"id": "1XrWcTY9",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 126.2827461766617,
			"y": -538.8350067951972,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 246.83203125,
			"height": 24,
			"seed": 883444559,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"fontSize": 20.062593629642038,
			"fontFamily": 3,
			"text": "scheduleUpdateOnFiber",
			"rawText": "scheduleUpdateOnFiber",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "S9f3GZB4AThXPYF1daEZG",
			"originalText": "scheduleUpdateOnFiber"
		},
		{
			"type": "arrow",
			"version": 1557,
			"versionNonce": 1040180233,
			"isDeleted": false,
			"id": "tNbADikarkU3tejzZ4VUA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 81.634547038503,
			"y": -521.6080798178948,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 0.5249566667429519,
			"height": 0.0021090943114359106,
			"seed": 1570357377,
			"groupIds": [
				"L2ebD6hNBas-mDW7lD8RT",
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1683637980818,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "jF5ojb3J",
				"gap": 14.792513931048006,
				"focus": 2.2183912739874385
			},
			"endBinding": {
				"elementId": "S9f3GZB4AThXPYF1daEZG",
				"gap": 7.539258096415722,
				"focus": -0.1438462950994529
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
					0.5249566667429519,
					-0.0021090943114359106
				]
			]
		},
		{
			"type": "text",
			"version": 455,
			"versionNonce": 1644393669,
			"isDeleted": false,
			"id": "jF5ojb3J",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -47.10110392099455,
			"y": -560.228775105744,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 80,
			"height": 24,
			"seed": 847041615,
			"groupIds": [
				"L2ebD6hNBas-mDW7lD8RT",
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "tNbADikarkU3tejzZ4VUA",
					"type": "arrow"
				}
			],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "同步更新",
			"rawText": "同步更新",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "同步更新"
		},
		{
			"type": "rectangle",
			"version": 403,
			"versionNonce": 430085157,
			"isDeleted": false,
			"id": "kKA5SiyaFhth0yo2WJU6S",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 638.175873618068,
			"y": -556.3265839436347,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 177,
			"height": 49,
			"seed": 1199412641,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "qVFaSPcV"
				},
				{
					"id": "ZIs0-ufxaWTEs9lsAWt8d",
					"type": "arrow"
				},
				{
					"id": "8sI_JNSYLH26U8-GMwmWS",
					"type": "arrow"
				},
				{
					"id": "t8LcvgWOnwGNgc2wnQ1s9",
					"type": "arrow"
				}
			],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 352,
			"versionNonce": 1343065829,
			"isDeleted": false,
			"id": "qVFaSPcV",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 668.082123618068,
			"y": -543.8265839436347,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 117.1875,
			"height": 24,
			"seed": 614947393,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "renderRoot",
			"rawText": "renderRoot",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "kKA5SiyaFhth0yo2WJU6S",
			"originalText": "renderRoot"
		},
		{
			"type": "rectangle",
			"version": 315,
			"versionNonce": 746782187,
			"isDeleted": false,
			"id": "vx2vKMEtz38pxvZbNSUXx",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 932.8109444188492,
			"y": -566.8844757893378,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 172,
			"height": 64,
			"seed": 1212382383,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "Atod23nN"
				},
				{
					"id": "8sI_JNSYLH26U8-GMwmWS",
					"type": "arrow"
				}
			],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 253,
			"versionNonce": 2061633675,
			"isDeleted": false,
			"id": "Atod23nN",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 960.2171944188492,
			"y": -546.8844757893378,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 117.1875,
			"height": 24,
			"seed": 309233057,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "commitRoot",
			"rawText": "commitRoot",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "vx2vKMEtz38pxvZbNSUXx",
			"originalText": "commitRoot"
		},
		{
			"type": "arrow",
			"version": 1048,
			"versionNonce": 1640207529,
			"isDeleted": false,
			"id": "ZIs0-ufxaWTEs9lsAWt8d",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 421.8851407454061,
			"y": -521.3935792082043,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 209.66554938266682,
			"height": 2.5225161875144977,
			"seed": 191451695,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1683637980820,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "S9f3GZB4AThXPYF1daEZG",
				"gap": 12.18637894374433,
				"focus": 0.22818619373689752
			},
			"endBinding": {
				"elementId": "kKA5SiyaFhth0yo2WJU6S",
				"gap": 6.625183489995038,
				"focus": -0.2646621713187402
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
					209.66554938266682,
					-2.5225161875144977
				]
			]
		},
		{
			"type": "arrow",
			"version": 887,
			"versionNonce": 415336777,
			"isDeleted": false,
			"id": "8sI_JNSYLH26U8-GMwmWS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 822.6920316998453,
			"y": -527.4910510481918,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 102.57712260456708,
			"height": 2.5296687464594925,
			"seed": 1592804225,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1683637980822,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "kKA5SiyaFhth0yo2WJU6S",
				"gap": 7.516158081777348,
				"focus": 0.2512282601401208
			},
			"endBinding": {
				"elementId": "vx2vKMEtz38pxvZbNSUXx",
				"gap": 7.541790114436935,
				"focus": -0.07493682731641658
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
					102.57712260456708,
					-2.5296687464594925
				]
			]
		},
		{
			"type": "rectangle",
			"version": 391,
			"versionNonce": 1911053573,
			"isDeleted": false,
			"id": "cVVrSKKG8IUB-tc0O6m9h",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 418.50998006338045,
			"y": -351.30348213699403,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 175,
			"height": 56,
			"seed": 1221078113,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "g7umxdqQ"
				},
				{
					"id": "189aMjaKyR9kUjqOaUv33",
					"type": "arrow"
				},
				{
					"id": "t8LcvgWOnwGNgc2wnQ1s9",
					"type": "arrow"
				}
			],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 318,
			"versionNonce": 1685794923,
			"isDeleted": false,
			"id": "g7umxdqQ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 456.71310506338045,
			"y": -335.30348213699403,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 98.59375,
			"height": 24,
			"seed": 528411073,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679987025921,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "lane 调度",
			"rawText": "lane 调度",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "cVVrSKKG8IUB-tc0O6m9h",
			"originalText": "lane 调度"
		},
		{
			"type": "arrow",
			"version": 907,
			"versionNonce": 338917417,
			"isDeleted": false,
			"id": "189aMjaKyR9kUjqOaUv33",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 268.694732746769,
			"y": -485.2445340175635,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 144.6753367038379,
			"height": 156.44776277971255,
			"seed": 769014497,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1683637980823,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "S9f3GZB4AThXPYF1daEZG",
				"gap": 10.590472777633636,
				"focus": 0.10317044712868347
			},
			"endBinding": {
				"elementId": "cVVrSKKG8IUB-tc0O6m9h",
				"gap": 5.139910612773576,
				"focus": -0.7721812197956203
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
					144.6753367038379,
					156.44776277971255
				]
			]
		},
		{
			"type": "arrow",
			"version": 954,
			"versionNonce": 1833208585,
			"isDeleted": false,
			"id": "t8LcvgWOnwGNgc2wnQ1s9",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 596.4038981428838,
			"y": -330.0243521186275,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 113.94868069509391,
			"height": 169.9849340736144,
			"seed": 1973033793,
			"groupIds": [
				"OTIcBRlQL0C6qpp8hUber"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1683637980824,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "cVVrSKKG8IUB-tc0O6m9h",
				"gap": 2.893918079503237,
				"focus": 0.8082136899086562
			},
			"endBinding": {
				"elementId": "kKA5SiyaFhth0yo2WJU6S",
				"gap": 7.3172977513927435,
				"focus": -0.04770425498263228
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
					113.94868069509391,
					-169.9849340736144
				]
			]
		},
		{
			"type": "arrow",
			"version": 897,
			"versionNonce": 2035086113,
			"isDeleted": false,
			"id": "g901mz-laJUIgHg00oaCQ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -630.2025512649951,
			"y": -20.647618172695154,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 119.77892001247744,
			"height": 19.125263715270272,
			"seed": 709012993,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327788619,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "SE4IHBbu",
				"focus": 0.4673229605404631,
				"gap": 23.747528076171875
			},
			"endBinding": {
				"elementId": "Ndo13qkm",
				"focus": 0.6042685345364529,
				"gap": 12.441406250000114
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
					119.77892001247744,
					-19.125263715270272
				]
			]
		},
		{
			"type": "text",
			"version": 527,
			"versionNonce": 611124033,
			"isDeleted": false,
			"id": "SE4IHBbu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -972.950079341167,
			"y": -119.79718326975444,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 319.05987548828125,
			"height": 144,
			"seed": 445962785,
			"groupIds": [
				"PGe6vK-s8TvNZ1NQ4N1av",
				"s-QGsqq0vd30UyMp6AU-e"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "g901mz-laJUIgHg00oaCQ",
					"type": "arrow"
				}
			],
			"updated": 1679327788619,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 1,
			"text": "同一个 fiber 会有多个 update \n 把fiber 的 pendign 结构变成 链表\n结构\na - a\nb - a - b\nc - a - b -c",
			"rawText": "同一个 fiber 会有多个 update \n 把fiber 的 pendign 结构变成 链表\n结构\na - a\nb - a - b\nc - a - b -c",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "同一个 fiber 会有多个 update \n 把fiber 的 pendign 结构变成 链表\n结构\na - a\nb - a - b\nc - a - b -c"
		},
		{
			"type": "text",
			"version": 341,
			"versionNonce": 1149766511,
			"isDeleted": false,
			"id": "jBDtKzKS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -963.0029019810689,
			"y": -168.2532797247831,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 136.07989501953125,
			"height": 24,
			"seed": 693507183,
			"groupIds": [
				"PGe6vK-s8TvNZ1NQ4N1av",
				"s-QGsqq0vd30UyMp6AU-e"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327788619,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "setState * 3",
			"rawText": "setState * 3",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "setState * 3"
		},
		{
			"type": "rectangle",
			"version": 147,
			"versionNonce": 811853569,
			"isDeleted": false,
			"id": "4xhlXHb1-cFd8g4oGGVhA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -988.1628025424544,
			"y": -184.51757793003333,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 352.90557861328125,
			"height": 254.92849731445312,
			"seed": 1097299983,
			"groupIds": [
				"s-QGsqq0vd30UyMp6AU-e"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327788619,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 725,
			"versionNonce": 1728309025,
			"isDeleted": false,
			"id": "Ndo13qkm",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -497.98222500251757,
			"y": -71.23869089564448,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 406.875,
			"height": 72,
			"seed": 1961597135,
			"groupIds": [
				"gKhjXaIjahdZTa2Gepmdr"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "g901mz-laJUIgHg00oaCQ",
					"type": "arrow"
				}
			],
			"updated": 1679327776085,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "1. 每个更新都拥有优先级\n2. 合并一个宏任务/微任务中触发的所有更新\n3. 算法决定哪个优先级优先进入render阶段",
			"rawText": "1. 每个更新都拥有优先级\n2. 合并一个宏任务/微任务中触发的所有更新\n3. 算法决定哪个优先级优先进入render阶段",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "1. 每个更新都拥有优先级\n2. 合并一个宏任务/微任务中触发的所有更新\n3. 算法决定哪个优先级优先进入render阶段"
		},
		{
			"type": "rectangle",
			"version": 247,
			"versionNonce": 1605079439,
			"isDeleted": false,
			"id": "bzCxk0CR4leUxA7Bs19pa",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -522.0150008814239,
			"y": -133.50721506556636,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 456.508056640625,
			"height": 200.8875732421875,
			"seed": 413987777,
			"groupIds": [
				"gKhjXaIjahdZTa2Gepmdr"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "AZXBYz7fYvXV7MJ474zqv",
					"type": "arrow"
				}
			],
			"updated": 1679327776085,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 323,
			"versionNonce": 1457534287,
			"isDeleted": false,
			"id": "sInVdxHu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 70.73887363309018,
			"y": -104.97770932186154,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 402.65625,
			"height": 24,
			"seed": 1419629057,
			"groupIds": [
				"Vn8jHMW7YZxS9qhUq2nAk"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327771317,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "mount biber 时候，添加更新 带有  lane",
			"rawText": "mount biber 时候，添加更新 带有  lane",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "mount biber 时候，添加更新 带有  lane"
		},
		{
			"type": "text",
			"version": 327,
			"versionNonce": 778292001,
			"isDeleted": false,
			"id": "VD2ZtwGh",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 124.12930764698592,
			"y": -51.14554653238724,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 339.84375,
			"height": 120,
			"seed": 711002767,
			"groupIds": [
				"Vn8jHMW7YZxS9qhUq2nAk"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327771317,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "interface Update<State> {\n    action: Action<State>;\n    lane: Lane;\n    next: Update<any> | null;\n}",
			"rawText": "interface Update<State> {\n    action: Action<State>;\n    lane: Lane;\n    next: Update<any> | null;\n}",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "interface Update<State> {\n    action: Action<State>;\n    lane: Lane;\n    next: Update<any> | null;\n}"
		},
		{
			"type": "rectangle",
			"version": 284,
			"versionNonce": 854242159,
			"isDeleted": false,
			"id": "03OoH4vzMNwtQKd-2e7w0",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 56.39941036635412,
			"y": -123.50153453053667,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 467.4815538194445,
			"height": 218.4115939670139,
			"seed": 1878387169,
			"groupIds": [
				"Vn8jHMW7YZxS9qhUq2nAk"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "AZXBYz7fYvXV7MJ474zqv",
					"type": "arrow"
				},
				{
					"id": "HP0Bj5dm9JEyIvlxUR_f3",
					"type": "arrow"
				}
			],
			"updated": 1679327771317,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "arrow",
			"version": 324,
			"versionNonce": 2055243695,
			"isDeleted": false,
			"id": "AZXBYz7fYvXV7MJ474zqv",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": -55.6024032251739,
			"y": -7.872322785954278,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 100.64969499343778,
			"height": 13.464959060630651,
			"seed": 343478031,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327776086,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "bzCxk0CR4leUxA7Bs19pa",
				"focus": 0.4352152569963202,
				"gap": 9.904541015625
			},
			"endBinding": {
				"elementId": "03OoH4vzMNwtQKd-2e7w0",
				"focus": 0.2835377617700382,
				"gap": 11.352118598090215
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
					100.64969499343778,
					-13.464959060630651
				]
			]
		},
		{
			"type": "text",
			"version": 191,
			"versionNonce": 34369775,
			"isDeleted": false,
			"id": "upRldUP1",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 738.0634895700698,
			"y": 4.287222002186354,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 272.34375,
			"height": 48,
			"seed": 2120638543,
			"groupIds": [
				"srLnpfNpYXcuKr9an68zR"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327772800,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "消费 update 就是消费 lane\n",
			"rawText": "消费 update 就是消费 lane\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "消费 update 就是消费 lane\n"
		},
		{
			"type": "rectangle",
			"version": 163,
			"versionNonce": 1206032769,
			"isDeleted": false,
			"id": "HWxl0ed-NKnOczYAX0Qzc",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 710.150220527101,
			"y": -25.398691083751146,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 327.22607421875,
			"height": 83.50384521484375,
			"seed": 995568161,
			"groupIds": [
				"srLnpfNpYXcuKr9an68zR"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "HP0Bj5dm9JEyIvlxUR_f3",
					"type": "arrow"
				},
				{
					"id": "2o41B2GFJHWFDVEVwvXPu",
					"type": "arrow"
				}
			],
			"updated": 1679327772800,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "arrow",
			"version": 378,
			"versionNonce": 1043710305,
			"isDeleted": false,
			"id": "HP0Bj5dm9JEyIvlxUR_f3",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 537.6202996232835,
			"y": 15.841685966202832,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 162.40077051319258,
			"height": 3.6512552886407708,
			"seed": 1684211297,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327772800,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "03OoH4vzMNwtQKd-2e7w0",
				"focus": 0.3150062135857989,
				"gap": 13.739335437484897
			},
			"endBinding": {
				"elementId": "HWxl0ed-NKnOczYAX0Qzc",
				"focus": 0.1776132108949841,
				"gap": 10.129150390625
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
					162.40077051319258,
					-3.6512552886407708
				]
			]
		},
		{
			"type": "arrow",
			"version": 724,
			"versionNonce": 1939402049,
			"isDeleted": false,
			"id": "2o41B2GFJHWFDVEVwvXPu",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 820.7923529756471,
			"y": 72.1252957326551,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 88.74351161036066,
			"height": 142.307561363829,
			"seed": 1245440751,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327772801,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "HWxl0ed-NKnOczYAX0Qzc",
				"focus": 0.0958039646690757,
				"gap": 14.0201416015625
			},
			"endBinding": {
				"elementId": "RxBa4QA2",
				"focus": -0.04494123709393298,
				"gap": 13.01104736328125
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
					-88.74351161036066,
					142.307561363829
				]
			]
		},
		{
			"type": "text",
			"version": 460,
			"versionNonce": 1178711951,
			"isDeleted": false,
			"id": "RxBa4QA2",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 372.0492955684442,
			"y": 227.44390445976535,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 686.71875,
			"height": 72,
			"seed": 594669711,
			"groupIds": [
				"8KRBMIapM29b3P9DnJsHs"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "2o41B2GFJHWFDVEVwvXPu",
					"type": "arrow"
				}
			],
			"updated": 1679327766264,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "在 fiberRootNode 上记录所有没有别消耗 lane 的集合，pendingLanes\n\nfiberRootNode 上本次消耗的 lane, finishedLane",
			"rawText": "在 fiberRootNode 上记录所有没有别消耗 lane 的集合，pendingLanes\n\nfiberRootNode 上本次消耗的 lane, finishedLane",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "在 fiberRootNode 上记录所有没有别消耗 lane 的集合，pendingLanes\n\nfiberRootNode 上本次消耗的 lane, finishedLane"
		},
		{
			"type": "rectangle",
			"version": 294,
			"versionNonce": 1514162369,
			"isDeleted": false,
			"id": "G64cI255DDyFVoB8DJekA",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 330.5585729121942,
			"y": 205.2376666667966,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 758.0381469726562,
			"height": 133.9097900390625,
			"seed": 2129355617,
			"groupIds": [
				"8KRBMIapM29b3P9DnJsHs"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "8mh_lOAkQgxWHM3OjcNxM",
					"type": "arrow"
				},
				{
					"id": "ixX3eWK3Ng-pndaKL0e1A",
					"type": "arrow"
				},
				{
					"id": "0-Kn_Gx-a6eNvB1aTmaeF",
					"type": "arrow"
				}
			],
			"updated": 1679327766264,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 188,
			"versionNonce": 704698113,
			"isDeleted": false,
			"id": "S0Kl2TuQ",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 355.0777490481189,
			"y": 523.3033071203417,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 271.25,
			"height": 33.6,
			"seed": 333932303,
			"groupIds": [
				"HiJwsUa7eerBsmKKIwSZG"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327725762,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 3,
			"text": "## 怎么选一个 lane",
			"rawText": "## 怎么选一个 lane",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "## 怎么选一个 lane"
		},
		{
			"type": "text",
			"version": 162,
			"versionNonce": 341628303,
			"isDeleted": false,
			"id": "KZw2sPNi",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 398.04216555202515,
			"y": 582.6068959875292,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 609.375,
			"height": 24,
			"seed": 233936225,
			"groupIds": [
				"HiJwsUa7eerBsmKKIwSZG"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327725762,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "scheduleUpdateOnFiber(fiber: FiberNode, lane: Lane) ",
			"rawText": "scheduleUpdateOnFiber(fiber: FiberNode, lane: Lane) ",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "scheduleUpdateOnFiber(fiber: FiberNode, lane: Lane) "
		},
		{
			"type": "text",
			"version": 637,
			"versionNonce": 212881121,
			"isDeleted": false,
			"id": "URlDgPyy",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 431.7585351809314,
			"y": 620.7456288976855,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 723.28125,
			"height": 144,
			"seed": 866495791,
			"groupIds": [
				"HiJwsUa7eerBsmKKIwSZG"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "3POMTIV4EAolgHEDe2STS",
					"type": "arrow"
				}
			],
			"updated": 1679327725762,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "1. 当前更新的 lane（不同的类型） 记录到 fiberRootNode 的 lanes 集合\n2. 调度流程\n3. 选一个lane 就是选出优先级最高的 lane 也就是二进制最右边的 1\n    1. 这个被选的 lane 如果是同步的，那么采用微任务调度（）\n        queueMicrotask -> promisr -> setTimeout\n    2. 否则，react 采用宏任务调度",
			"rawText": "1. 当前更新的 lane（不同的类型） 记录到 fiberRootNode 的 lanes 集合\n2. 调度流程\n3. 选一个lane 就是选出优先级最高的 lane 也就是二进制最右边的 1\n    1. 这个被选的 lane 如果是同步的，那么采用微任务调度（）\n        queueMicrotask -> promisr -> setTimeout\n    2. 否则，react 采用宏任务调度",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "1. 当前更新的 lane（不同的类型） 记录到 fiberRootNode 的 lanes 集合\n2. 调度流程\n3. 选一个lane 就是选出优先级最高的 lane 也就是二进制最右边的 1\n    1. 这个被选的 lane 如果是同步的，那么采用微任务调度（）\n        queueMicrotask -> promisr -> setTimeout\n    2. 否则，react 采用宏任务调度"
		},
		{
			"type": "rectangle",
			"version": 135,
			"versionNonce": 275336111,
			"isDeleted": false,
			"id": "-Y9YWyvZnBTNPRFgnoC6z",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 314.7481286867908,
			"y": 488.272850577373,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 861.2337341308594,
			"height": 320.8697509765625,
			"seed": 1485160609,
			"groupIds": [
				"HiJwsUa7eerBsmKKIwSZG"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "8mh_lOAkQgxWHM3OjcNxM",
					"type": "arrow"
				},
				{
					"id": "GSSXeixwG4bPAv7wJQQn3",
					"type": "arrow"
				}
			],
			"updated": 1679327725762,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "arrow",
			"version": 608,
			"versionNonce": 1872464033,
			"isDeleted": false,
			"id": "8mh_lOAkQgxWHM3OjcNxM",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 695.411752329699,
			"y": 357.81078678398404,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 10.402618592843396,
			"height": 116.3991975824514,
			"seed": 646517103,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327766265,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "G64cI255DDyFVoB8DJekA",
				"focus": 0.05680051500248778,
				"gap": 18.663330078125
			},
			"endBinding": {
				"elementId": "-Y9YWyvZnBTNPRFgnoC6z",
				"focus": -0.05383854598313492,
				"gap": 14.0628662109375
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
					10.402618592843396,
					116.3991975824514
				]
			]
		},
		{
			"type": "arrow",
			"version": 132,
			"versionNonce": 580857281,
			"isDeleted": false,
			"id": "3POMTIV4EAolgHEDe2STS",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 993.3047387942127,
			"y": 596.193016592998,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 339.22528076171875,
			"height": 28.5654296875,
			"seed": 314417281,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679326945674,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "URlDgPyy",
				"focus": -1.0974459751856582,
				"gap": 24.5526123046875
			},
			"endBinding": {
				"elementId": "a4O4PWJF",
				"focus": -0.24728429234750376,
				"gap": 17.6953125
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
					339.22528076171875,
					28.5654296875
				]
			]
		},
		{
			"type": "text",
			"version": 526,
			"versionNonce": 1015302863,
			"isDeleted": false,
			"id": "a4O4PWJF",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1350.2253320559314,
			"y": 539.7856679601855,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 498.59375,
			"height": 144,
			"seed": 426351169,
			"groupIds": [
				"pDEcDzjxIvCEf_Mh4UMtR"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "3POMTIV4EAolgHEDe2STS",
					"type": "arrow"
				}
			],
			"updated": 1679326945674,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "虽然每次更新都回调用这个流程\n全局 存在三个 update\n[ u1, u2, u3]\n每次触发一个更新，都是遍历一下 arr 并添加到微任务\n第一次更新，会把三个回调放进 微任务\n后两次，由于哨兵的存在，不会重复添加到微任务",
			"rawText": "虽然每次更新都回调用这个流程\n全局 存在三个 update\n[ u1, u2, u3]\n每次触发一个更新，都是遍历一下 arr 并添加到微任务\n第一次更新，会把三个回调放进 微任务\n后两次，由于哨兵的存在，不会重复添加到微任务",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "虽然每次更新都回调用这个流程\n全局 存在三个 update\n[ u1, u2, u3]\n每次触发一个更新，都是遍历一下 arr 并添加到微任务\n第一次更新，会把三个回调放进 微任务\n后两次，由于哨兵的存在，不会重复添加到微任务"
		},
		{
			"type": "rectangle",
			"version": 88,
			"versionNonce": 1960168865,
			"isDeleted": false,
			"id": "DDOvjTOYySERNvkvAqgG8",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1320.8262231692127,
			"y": 506.856102530498,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 537.1461791992188,
			"height": 218.84722900390625,
			"seed": 1425994831,
			"groupIds": [
				"pDEcDzjxIvCEf_Mh4UMtR"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679326945674,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 655,
			"versionNonce": 1714955983,
			"isDeleted": false,
			"id": "1qXl9zM6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 362.0394328851585,
			"y": 978.5897030566041,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 586.71875,
			"height": 96,
			"seed": 2029804513,
			"groupIds": [
				"xeTRJNft9wkmjQsmWqarI"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327731685,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "1. 创建wip fiberNode树，初始化全局的wipRootRenderLane\n通过这个方法 prepareFreshStack(root, lane);\n\n2. workLoop 执行 beginwork",
			"rawText": "1. 创建wip fiberNode树，初始化全局的wipRootRenderLane\n通过这个方法 prepareFreshStack(root, lane);\n\n2. workLoop 执行 beginwork",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "1. 创建wip fiberNode树，初始化全局的wipRootRenderLane\n通过这个方法 prepareFreshStack(root, lane);\n\n2. workLoop 执行 beginwork"
		},
		{
			"type": "text",
			"version": 485,
			"versionNonce": 1440592289,
			"isDeleted": false,
			"id": "6chygW35",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 341.21644721888526,
			"y": 914.9726142896259,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 157.1875,
			"height": 24,
			"seed": 1752207023,
			"groupIds": [
				"xeTRJNft9wkmjQsmWqarI"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327731685,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "## render 阶段",
			"rawText": "## render 阶段",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "## render 阶段"
		},
		{
			"type": "rectangle",
			"version": 576,
			"versionNonce": 1162376431,
			"isDeleted": false,
			"id": "Lhrtb10XuEp_i3FQZAFZ6",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 323.13096829575727,
			"y": 888.459450786437,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 662.7938580866021,
			"height": 256.92080026278757,
			"seed": 267580193,
			"groupIds": [
				"xeTRJNft9wkmjQsmWqarI"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "pRxY_o_GBrswsHi7WSfIR",
					"type": "arrow"
				}
			],
			"updated": 1679327731685,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 834,
			"versionNonce": 1334365711,
			"isDeleted": false,
			"id": "BrzZS2N4",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 611.2464951823605,
			"y": 1245.5507423614426,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 105.46875,
			"height": 24,
			"seed": 540982319,
			"groupIds": [
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "Vcdvb5dnmQc_GxC9fvwYJ",
					"type": "arrow"
				},
				{
					"id": "BhwuLhFT4omoBxuC4M7-k",
					"type": "arrow"
				},
				{
					"id": "pRxY_o_GBrswsHi7WSfIR",
					"type": "arrow"
				}
			],
			"updated": 1679327751651,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "beginWork",
			"rawText": "beginWork",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "beginWork"
		},
		{
			"type": "text",
			"version": 866,
			"versionNonce": 1799404065,
			"isDeleted": false,
			"id": "6rZbms3A",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 388.28640443455777,
			"y": 1455.813054376583,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 269.53125,
			"height": 24,
			"seed": 1859700225,
			"groupIds": [
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "Vcdvb5dnmQc_GxC9fvwYJ",
					"type": "arrow"
				},
				{
					"id": "QkJCkhmRRW2trh7yB6_82",
					"type": "arrow"
				}
			],
			"updated": 1679327751651,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "updateFunctionComponent",
			"rawText": "updateFunctionComponent",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "updateFunctionComponent"
		},
		{
			"type": "text",
			"version": 634,
			"versionNonce": 685100687,
			"isDeleted": false,
			"id": "f0J1T5Jr",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 734.5097648611232,
			"y": 1457.8886155818361,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 164.0625,
			"height": 24,
			"seed": 1385409711,
			"groupIds": [
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "BhwuLhFT4omoBxuC4M7-k",
					"type": "arrow"
				},
				{
					"id": "ogQvk1TT9VgF7Bi-xVDhQ",
					"type": "arrow"
				}
			],
			"updated": 1679327751651,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "updateHostRoot",
			"rawText": "updateHostRoot",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "updateHostRoot"
		},
		{
			"type": "arrow",
			"version": 731,
			"versionNonce": 17300737,
			"isDeleted": false,
			"id": "Vcdvb5dnmQc_GxC9fvwYJ",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 665.7836085553226,
			"y": 1276.696488956007,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 101.91063537078327,
			"height": 172.6431168536992,
			"seed": 753849839,
			"groupIds": [
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327752030,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "BrzZS2N4",
				"focus": -0.21368210786210035,
				"gap": 7.1457465945643435
			},
			"endBinding": {
				"elementId": "6rZbms3A",
				"focus": 0.20466424171678135,
				"gap": 6.473448566876868
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
					-101.91063537078327,
					172.6431168536992
				]
			]
		},
		{
			"type": "arrow",
			"version": 763,
			"versionNonce": 65189089,
			"isDeleted": false,
			"id": "BhwuLhFT4omoBxuC4M7-k",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 681.9317065525133,
			"y": 1276.9132984588264,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 124.64276620684643,
			"height": 174.79525653467613,
			"seed": 222158497,
			"groupIds": [
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327752030,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "BrzZS2N4",
				"focus": -0.06300159971209325,
				"gap": 7.362556097383731
			},
			"endBinding": {
				"elementId": "f0J1T5Jr",
				"focus": 0.027768568989909512,
				"gap": 6.1800605883336175
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
					124.64276620684643,
					174.79525653467613
				]
			]
		},
		{
			"type": "arrow",
			"version": 910,
			"versionNonce": 1851486401,
			"isDeleted": false,
			"id": "QkJCkhmRRW2trh7yB6_82",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 551.2087244477935,
			"y": 1490.5279911077826,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 107.09610642537018,
			"height": 103.74193478356233,
			"seed": 292084239,
			"groupIds": [
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327752030,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "6rZbms3A",
				"focus": -0.026864702843113722,
				"gap": 10.714936731199487
			},
			"endBinding": {
				"elementId": "CplKgBB6",
				"focus": 0.11067451906254022,
				"gap": 8.552583338985414
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
					107.09610642537018,
					103.74193478356233
				]
			]
		},
		{
			"type": "arrow",
			"version": 925,
			"versionNonce": 638693537,
			"isDeleted": false,
			"id": "ogQvk1TT9VgF7Bi-xVDhQ",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 810.2048862364769,
			"y": 1486.5615986681787,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 89.0432609978725,
			"height": 113.08753412778606,
			"seed": 1711412463,
			"groupIds": [
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327752030,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "f0J1T5Jr",
				"focus": -0.06876834857659588,
				"gap": 4.672983086342583
			},
			"endBinding": {
				"elementId": "CplKgBB6",
				"focus": 0.16819071765535148,
				"gap": 3.1733764343655366
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
					-89.0432609978725,
					113.08753412778606
				]
			]
		},
		{
			"type": "text",
			"version": 1803,
			"versionNonce": 1669547393,
			"isDeleted": false,
			"id": "JZCavAcV",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 6.279127840477754,
			"x": 203.10520342283522,
			"y": 1622.9640923596653,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 1063.4970703125,
			"height": 240,
			"seed": 1041415279,
			"groupIds": [
				"dJG_zGGDb82rCaDYzqiAj",
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327751651,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20.234274902373436,
			"fontFamily": 3,
			"text": "\n                /**\n                 * padding = a -> b -> c -> a 当前 fiber的update链表\n                 * renderLane 正在渲染的lane，这个 lane 是在 render (执行workLoop) 之前就确定的\n                 * 如果update的lane和renderLane相同，才会执行update\n                 *\n                 * a 完毕，递归进入 b,\n                 * b 完毕，递归进入 c,\n                 * c 完毕，递归进入 a a === first，退出循环\n                 */",
			"rawText": "\n                /**\n                 * padding = a -> b -> c -> a 当前 fiber的update链表\n                 * renderLane 正在渲染的lane，这个 lane 是在 render (执行workLoop) 之前就确定的\n                 * 如果update的lane和renderLane相同，才会执行update\n                 *\n                 * a 完毕，递归进入 b,\n                 * b 完毕，递归进入 c,\n                 * c 完毕，递归进入 a a === first，退出循环\n                 */",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "\n                /**\n                 * padding = a -> b -> c -> a 当前 fiber的update链表\n                 * renderLane 正在渲染的lane，这个 lane 是在 render (执行workLoop) 之前就确定的\n                 * 如果update的lane和renderLane相同，才会执行update\n                 *\n                 * a 完毕，递归进入 b,\n                 * b 完毕，递归进入 c,\n                 * c 完毕，递归进入 a a === first，退出循环\n                 */"
		},
		{
			"type": "text",
			"version": 660,
			"versionNonce": 2103349007,
			"isDeleted": false,
			"id": "CplKgBB6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 545.8908194056555,
			"y": 1602.8225092303303,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 257.8125,
			"height": 48,
			"seed": 323877313,
			"groupIds": [
				"dJG_zGGDb82rCaDYzqiAj",
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "QkJCkhmRRW2trh7yB6_82",
					"type": "arrow"
				},
				{
					"id": "ogQvk1TT9VgF7Bi-xVDhQ",
					"type": "arrow"
				}
			],
			"updated": 1679327751651,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			},
			"fontSize": 20,
			"fontFamily": 3,
			"text": "   processUpdateQueue \n",
			"rawText": "   processUpdateQueue \n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "   processUpdateQueue \n"
		},
		{
			"type": "rectangle",
			"version": 384,
			"versionNonce": 134125889,
			"isDeleted": false,
			"id": "zi3KWN9eagP8EE74iGnVj",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 315.2877631289517,
			"y": 1586.734650547764,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 963.7212173449213,
			"height": 332.2318587137065,
			"seed": 1977910095,
			"groupIds": [
				"dJG_zGGDb82rCaDYzqiAj",
				"kiY6zkHh1h0SXTthJpXaS"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "xlGwhApth8GHCr9zaAKHh",
					"type": "arrow"
				}
			],
			"updated": 1679327751651,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "arrow",
			"version": 640,
			"versionNonce": 1544860129,
			"isDeleted": false,
			"id": "ixX3eWK3Ng-pndaKL0e1A",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 53.05434176660174,
			"y": 386.0311915539051,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 260.66955262212576,
			"height": 82.95347791171707,
			"seed": 1358781263,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327774534,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "NapaG1xPkCxKiMXgpadOO",
				"focus": 0.10618246379043109,
				"gap": 22.241554234691193
			},
			"endBinding": {
				"elementId": "G64cI255DDyFVoB8DJekA",
				"focus": 0.5069456360249803,
				"gap": 16.834678523466664
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
					260.66955262212576,
					-82.95347791171707
				]
			]
		},
		{
			"type": "arrow",
			"version": 563,
			"versionNonce": 2108282447,
			"isDeleted": false,
			"id": "pRxY_o_GBrswsHi7WSfIR",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 676.0479287322828,
			"y": 1159.5179327084868,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 0.9236691326832442,
			"height": 73.4300958847457,
			"seed": 1713485647,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327751651,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "Lhrtb10XuEp_i3FQZAFZ6",
				"focus": -0.0596883171984564,
				"gap": 14.137681659262057
			},
			"endBinding": {
				"elementId": "BrzZS2N4",
				"focus": 0.2452369776452117,
				"gap": 12.602713768210151
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
					0.9236691326832442,
					73.4300958847457
				]
			]
		},
		{
			"type": "text",
			"version": 844,
			"versionNonce": 641021103,
			"isDeleted": false,
			"id": "xqfiTrPX",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 565.2121439845811,
			"y": 2116.8814269756026,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 228.90625,
			"height": 48,
			"seed": 546659919,
			"groupIds": [
				"PI223WsEQaXOQbSozE4my",
				"8iNQBqI4DjEB-sa_GLbEQ"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327753866,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "commitRoot(root)\n    1.移出当前的 lane",
			"rawText": "commitRoot(root)\n    1.移出当前的 lane",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "commitRoot(root)\n    1.移出当前的 lane"
		},
		{
			"type": "text",
			"version": 788,
			"versionNonce": 1785262529,
			"isDeleted": false,
			"id": "mCUhoYoI",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 530.30216784575,
			"y": 2062.5940232414923,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 290.9375,
			"height": 24,
			"seed": 1689367073,
			"groupIds": [
				"PI223WsEQaXOQbSozE4my",
				"8iNQBqI4DjEB-sa_GLbEQ"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1679327753866,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 3,
			"text": "### commit 阶段  销毁 lane",
			"rawText": "### commit 阶段  销毁 lane",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "### commit 阶段  销毁 lane"
		},
		{
			"type": "rectangle",
			"version": 460,
			"versionNonce": 36226767,
			"isDeleted": false,
			"id": "vvpyuMdHy9QFnrYVbs2Ej",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 499.10893645235285,
			"y": 2031.6724595673468,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 350.6518108539275,
			"height": 170.64198041095278,
			"seed": 80796193,
			"groupIds": [
				"8iNQBqI4DjEB-sa_GLbEQ"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "xlGwhApth8GHCr9zaAKHh",
					"type": "arrow"
				}
			],
			"updated": 1679327753866,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "arrow",
			"version": 729,
			"versionNonce": 1512379631,
			"isDeleted": false,
			"id": "xlGwhApth8GHCr9zaAKHh",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 689.2635705253383,
			"y": 1944.746247889827,
			"strokeColor": "#2b8a3e",
			"backgroundColor": "transparent",
			"width": 2.040483132855229,
			"height": 76.94356649120937,
			"seed": 2001670497,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1679327753866,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "zi3KWN9eagP8EE74iGnVj",
				"focus": 0.23228990053981963,
				"gap": 25.779738628356313
			},
			"endBinding": {
				"elementId": "vvpyuMdHy9QFnrYVbs2Ej",
				"focus": 0.10922207215898329,
				"gap": 9.982645186310492
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
					2.040483132855229,
					76.94356649120937
				]
			]
		},
		{
			"type": "rectangle",
			"version": 602,
			"versionNonce": 818959009,
			"isDeleted": false,
			"id": "F0k-NCItXijmEwZvYLgVm",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1425.3176200082244,
			"y": 175.08648916655739,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#40c057",
			"width": 411,
			"height": 121,
			"seed": 422233583,
			"groupIds": [],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "geJxqfHS"
				},
				{
					"id": "0-Kn_Gx-a6eNvB1aTmaeF",
					"type": "arrow"
				},
				{
					"id": "GSSXeixwG4bPAv7wJQQn3",
					"type": "arrow"
				}
			],
			"updated": 1679327683585,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 580,
			"versionNonce": 294849125,
			"isDeleted": false,
			"id": "geJxqfHS",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1464.0835196664275,
			"y": 223.58648916655739,
			"strokeColor": "#c92a2a",
			"backgroundColor": "transparent",
			"width": 333.46820068359375,
			"height": 24,
			"seed": 729697473,
			"groupIds": [],
			"roundness": null,
			"boundElements": [],
			"updated": 1679987017545,
			"link": null,
			"locked": false,
			"fontSize": 20.03383927211153,
			"fontFamily": 3,
			"text": "## scheduleUpdateOnFiber 调度",
			"rawText": "## scheduleUpdateOnFiber 调度",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "F0k-NCItXijmEwZvYLgVm",
			"originalText": "## scheduleUpdateOnFiber 调度"
		},
		{
			"type": "arrow",
			"version": 617,
			"versionNonce": 1819296233,
			"isDeleted": false,
			"id": "0-Kn_Gx-a6eNvB1aTmaeF",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1411.5997043541488,
			"y": 256.1662257846619,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#40c057",
			"width": 314.71259013228655,
			"height": 5.430358722565813,
			"seed": 1454913807,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1683637980825,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "F0k-NCItXijmEwZvYLgVm",
				"gap": 13.717915654075568,
				"focus": -0.38040972712832144
			},
			"endBinding": {
				"elementId": "G64cI255DDyFVoB8DJekA",
				"gap": 8.290394337011776,
				"focus": -0.3828799808912948
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
					-314.71259013228655,
					-5.430358722565813
				]
			]
		},
		{
			"type": "arrow",
			"version": 146,
			"versionNonce": 1052908745,
			"isDeleted": false,
			"id": "GSSXeixwG4bPAv7wJQQn3",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1413.6576851754612,
			"y": 250.4773056321573,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#40c057",
			"width": 224.45613000045205,
			"height": 271.41939453671677,
			"seed": 1838916207,
			"groupIds": [],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1683637980825,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "F0k-NCItXijmEwZvYLgVm",
				"gap": 11.659934832763156,
				"focus": 0.801644397500554
			},
			"endBinding": {
				"elementId": "-Y9YWyvZnBTNPRFgnoC6z",
				"gap": 13.219692357359008,
				"focus": 0.6017615582592913
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
					-224.45613000045205,
					271.41939453671677
				]
			]
		},
		{
			"id": "OJ5cA9l5",
			"type": "text",
			"x": 976.7414657286241,
			"y": -195.30267941387046,
			"width": 70.3125,
			"height": 24,
			"angle": 0,
			"strokeColor": "#c92a2a",
			"backgroundColor": "#40c057",
			"fillStyle": "hachure",
			"strokeWidth": 0.5,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"roundness": null,
			"seed": 1540767369,
			"version": 8,
			"versionNonce": 1870111719,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1683638317864,
			"link": null,
			"locked": false,
			"text": "      ",
			"rawText": "      ",
			"fontSize": 20,
			"fontFamily": 3,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "      "
		}
	],
	"appState": {
		"theme": "light",
		"viewBackgroundColor": "#ffffff",
		"currentItemStrokeColor": "#c92a2a",
		"currentItemBackgroundColor": "#40c057",
		"currentItemFillStyle": "hachure",
		"currentItemStrokeWidth": 0.5,
		"currentItemStrokeStyle": "dashed",
		"currentItemRoughness": 1,
		"currentItemOpacity": 100,
		"currentItemFontFamily": 3,
		"currentItemFontSize": 20,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"scrollX": 519.7949829277873,
		"scrollY": 233.7660495620358,
		"zoom": {
			"value": 0.6287593626976016
		},
		"currentItemRoundness": "round",
		"gridSize": null,
		"colorPalette": {},
		"currentStrokeOptions": null,
		"previousGridSize": null
	},
	"files": {}
}
```
%%