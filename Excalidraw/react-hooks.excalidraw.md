---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠==


# Text Elements
react ^oimEWci6

当前使用的 Hooks 的集合 ^M3qlQnqR

mount 时 ^Avk1OTRw

useState

useEffect
... ^LlRZDaI8

update 时 ^0VAMhqH9

useState

useEffect
... ^GUPgJ90m

hook 上下文中 ^azX3Np5o

useState

useEffect
... ^5Nej002k

内部数据共享层 ^PMt3snQq

Reconciler ^Yt57g5HQ

mount 时调用 useState ^40r10j1m

FC mount 时创建 useState，挂载到全局
数据共享层 ^YmaXtp2Y

React.useState 从共享层拿到
useState 的方法 ^gGBNUs0W

fiber---> hooks ---> updateQueue ---> update ---> action
创建一个 hooks 的链表
1. 与当前 fiber 关联，fiber.m = hooks
2. 关联一个 updateQueue, hoos.updateQueue = updateQueue
3. 根据用户传递的 fn 创建一个 update
4. updateQueue 添加 update
5. 调度更新
 ^1yI9E2kn

%%
# Drawing
```json
{
	"type": "excalidraw",
	"version": 2,
	"source": "https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/1.8.20",
	"elements": [
		{
			"type": "rectangle",
			"version": 577,
			"versionNonce": 312764908,
			"isDeleted": false,
			"id": "I9ozIFVHYV3NtczlxwbNH",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 964.293069731136,
			"y": 652.398565315184,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 213,
			"height": 117,
			"seed": 1306582738,
			"groupIds": [
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "oimEWci6"
				},
				{
					"id": "r0uD5kXwIYeT69WgT-L92",
					"type": "arrow"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 529,
			"versionNonce": 2094550124,
			"isDeleted": false,
			"id": "oimEWci6",
			"fillStyle": "hachure",
			"strokeWidth": 1,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1021.995088468929,
			"y": 689.298565315184,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 97.59596252441406,
			"height": 43.199999999999996,
			"seed": 1046515278,
			"groupIds": [
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 36,
			"fontFamily": 1,
			"text": "react",
			"rawText": "react",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "I9ozIFVHYV3NtczlxwbNH",
			"originalText": "react"
		},
		{
			"type": "rectangle",
			"version": 1014,
			"versionNonce": 351404116,
			"isDeleted": false,
			"id": "R8aonkOV84bYNZ2gDDSAT",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1577.2096550567228,
			"y": 455.384630068162,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 387,
			"height": 532,
			"seed": 1726648590,
			"groupIds": [
				"kVYbQeEYQDavbsYjzk2vQ",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"type": "text",
					"id": "M3qlQnqR"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 1031,
			"versionNonce": 1802231532,
			"isDeleted": false,
			"id": "M3qlQnqR",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1653.8196861846525,
			"y": 709.384630068162,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 233.77993774414062,
			"height": 24,
			"seed": 602464782,
			"groupIds": [
				"kVYbQeEYQDavbsYjzk2vQ",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 20,
			"fontFamily": 1,
			"text": "当前使用的 Hooks 的集合",
			"rawText": "当前使用的 Hooks 的集合",
			"textAlign": "center",
			"verticalAlign": "middle",
			"containerId": "R8aonkOV84bYNZ2gDDSAT",
			"originalText": "当前使用的 Hooks 的集合"
		},
		{
			"type": "rectangle",
			"version": 676,
			"versionNonce": 955700692,
			"isDeleted": false,
			"id": "DG_iHMCPi26gWMC5Y8vJC",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1627.0338541081207,
			"y": 665.9995265925024,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 282.15632239741103,
			"height": 107.52966161462189,
			"seed": 1883711822,
			"groupIds": [
				"kVYbQeEYQDavbsYjzk2vQ",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "ok301Yz7NhdumtT5LJgBr",
					"type": "arrow"
				},
				{
					"id": "66nthQ1eroa_CREnHg9TY",
					"type": "arrow"
				},
				{
					"id": "Ol_sPr151-xW1dOwxTkkg",
					"type": "arrow"
				},
				{
					"id": "r0uD5kXwIYeT69WgT-L92",
					"type": "arrow"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 697,
			"versionNonce": 143177324,
			"isDeleted": false,
			"id": "PMt3snQq",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1602.0447171437866,
			"y": 472.0990961674281,
			"strokeColor": "#c92a2a",
			"backgroundColor": "transparent",
			"width": 196,
			"height": 33.6,
			"seed": 460010002,
			"groupIds": [
				"kVYbQeEYQDavbsYjzk2vQ",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "内部数据共享层",
			"rawText": "内部数据共享层",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "内部数据共享层"
		},
		{
			"type": "rectangle",
			"version": 1298,
			"versionNonce": 710227540,
			"isDeleted": false,
			"id": "gtFirh29jHW3dp8FDDs6l",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2550.2746388014393,
			"y": -27.294041414311778,
			"strokeColor": "#000000",
			"backgroundColor": "transparent",
			"width": 725.4168847649021,
			"height": 1369.2771926160274,
			"seed": 1232251282,
			"groupIds": [
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false
		},
		{
			"type": "rectangle",
			"version": 949,
			"versionNonce": 964626668,
			"isDeleted": false,
			"id": "XP3Nr9bmsmuBFEIIuNUSk",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2746.2226786381616,
			"y": 206.4125784422912,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 267.822937216593,
			"height": 277.9071703699678,
			"seed": 1870120654,
			"groupIds": [
				"M-9s3rMgH-QrLI6M37t1T",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "ok301Yz7NhdumtT5LJgBr",
					"type": "arrow"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 820,
			"versionNonce": 1292307308,
			"isDeleted": false,
			"id": "Avk1OTRw",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2780.5650915813894,
			"y": 229.05327545343738,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 120.03596496582031,
			"height": 33.6,
			"seed": 1761061774,
			"groupIds": [
				"M-9s3rMgH-QrLI6M37t1T",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "mount 时",
			"rawText": "mount 时",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "mount 时"
		},
		{
			"type": "text",
			"version": 866,
			"versionNonce": 861057364,
			"isDeleted": false,
			"id": "LlRZDaI8",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2811.4929183048025,
			"y": 291.92282115691916,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 137.7039337158203,
			"height": 134.4,
			"seed": 446179086,
			"groupIds": [
				"M-9s3rMgH-QrLI6M37t1T",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "useState\n\nuseEffect\n...",
			"rawText": "useState\n\nuseEffect\n...",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "useState\n\nuseEffect\n..."
		},
		{
			"type": "rectangle",
			"version": 957,
			"versionNonce": 1701494252,
			"isDeleted": false,
			"id": "ORRgB8TQAz6bGYWocSbq9",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2756.31592094852,
			"y": 572.3412242218816,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 267.822937216593,
			"height": 277.9071703699678,
			"seed": 1169315726,
			"groupIds": [
				"Lxi-WOyK6bR7syyKZbo9-",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "66nthQ1eroa_CREnHg9TY",
					"type": "arrow"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 841,
			"versionNonce": 1270095980,
			"isDeleted": false,
			"id": "0VAMhqH9",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2790.658333891748,
			"y": 594.9819212330278,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 137.4519500732422,
			"height": 33.6,
			"seed": 1726689362,
			"groupIds": [
				"Lxi-WOyK6bR7syyKZbo9-",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "update 时",
			"rawText": "update 时",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "update 时"
		},
		{
			"type": "text",
			"version": 874,
			"versionNonce": 292383828,
			"isDeleted": false,
			"id": "GUPgJ90m",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2821.586160615161,
			"y": 657.8514669365096,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 137.7039337158203,
			"height": 134.4,
			"seed": 886846926,
			"groupIds": [
				"Lxi-WOyK6bR7syyKZbo9-",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "useState\n\nuseEffect\n...",
			"rawText": "useState\n\nuseEffect\n...",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "useState\n\nuseEffect\n..."
		},
		{
			"type": "rectangle",
			"version": 949,
			"versionNonce": 397226732,
			"isDeleted": false,
			"id": "YAwxIC8nkwHEDvV__g-Uw",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2761.635068984505,
			"y": 944.6141705038854,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 267.822937216593,
			"height": 277.9071703699678,
			"seed": 34568018,
			"groupIds": [
				"JLTEAVc4kKmLyRAnOwveF",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "Ol_sPr151-xW1dOwxTkkg",
					"type": "arrow"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 853,
			"versionNonce": 1474295148,
			"isDeleted": false,
			"id": "azX3Np5o",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2795.977620787129,
			"y": 966.7192868233699,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 184.49195861816406,
			"height": 33.6,
			"seed": 38002382,
			"groupIds": [
				"JLTEAVc4kKmLyRAnOwveF",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "hook 上下文中",
			"rawText": "hook 上下文中",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "hook 上下文中"
		},
		{
			"type": "text",
			"version": 866,
			"versionNonce": 240478036,
			"isDeleted": false,
			"id": "5Nej002k",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2826.905308651146,
			"y": 1030.1244132185134,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 137.7039337158203,
			"height": 134.4,
			"seed": 461946130,
			"groupIds": [
				"JLTEAVc4kKmLyRAnOwveF",
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 28,
			"fontFamily": 1,
			"text": "useState\n\nuseEffect\n...",
			"rawText": "useState\n\nuseEffect\n...",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "useState\n\nuseEffect\n..."
		},
		{
			"type": "text",
			"version": 748,
			"versionNonce": 966158316,
			"isDeleted": false,
			"id": "Yt57g5HQ",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2565.855033485829,
			"y": -15.543336644883425,
			"strokeColor": "#c92a2a",
			"backgroundColor": "transparent",
			"width": 169.52391052246094,
			"height": 43.199999999999996,
			"seed": 2114749778,
			"groupIds": [
				"EsThIHmzzAkKg5GwXVVQm",
				"KuDfSSRRWATqqzQDlYSnj",
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 36,
			"fontFamily": 1,
			"text": "Reconciler",
			"rawText": "Reconciler",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "Reconciler"
		},
		{
			"type": "arrow",
			"version": 2101,
			"versionNonce": 1540993260,
			"isDeleted": false,
			"id": "ok301Yz7NhdumtT5LJgBr",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2729.462278986335,
			"y": 358.8634223322356,
			"strokeColor": "#c92a2a",
			"backgroundColor": "transparent",
			"width": 808.138167290213,
			"height": 342.85573508279265,
			"seed": 230886862,
			"groupIds": [
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1680002659532,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "XP3Nr9bmsmuBFEIIuNUSk",
				"focus": 0.25758227554916446,
				"gap": 16.760399651826674
			},
			"endBinding": {
				"elementId": "DG_iHMCPi26gWMC5Y8vJC",
				"focus": 0.41327704979311425,
				"gap": 12.13393519059025
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
					-808.138167290213,
					342.85573508279265
				]
			]
		},
		{
			"type": "arrow",
			"version": 2256,
			"versionNonce": 499954540,
			"isDeleted": false,
			"id": "66nthQ1eroa_CREnHg9TY",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2739.715125247426,
			"y": 734.9568773795659,
			"strokeColor": "#c92a2a",
			"backgroundColor": "transparent",
			"width": 817.381437432864,
			"height": 13.919343849122498,
			"seed": 482720334,
			"groupIds": [
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1680002659533,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "ORRgB8TQAz6bGYWocSbq9",
				"focus": -0.18568596771274307,
				"gap": 16.600795701094512
			},
			"endBinding": {
				"elementId": "DG_iHMCPi26gWMC5Y8vJC",
				"focus": -0.02409043305897677,
				"gap": 13.143511309030032
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
					-817.381437432864,
					-13.919343849122498
				]
			]
		},
		{
			"type": "arrow",
			"version": 2322,
			"versionNonce": 1597728236,
			"isDeleted": false,
			"id": "Ol_sPr151-xW1dOwxTkkg",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "dashed",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2750.728120758682,
			"y": 1088.375813350297,
			"strokeColor": "#c92a2a",
			"backgroundColor": "transparent",
			"width": 830.0002786442731,
			"height": 344.2623521063101,
			"seed": 1636218578,
			"groupIds": [
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1680002659533,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "YAwxIC8nkwHEDvV__g-Uw",
				"focus": -0.3335531623499728,
				"gap": 10.906948225823044
			},
			"endBinding": {
				"elementId": "DG_iHMCPi26gWMC5Y8vJC",
				"focus": -0.34691678800758324,
				"gap": 11.537665608877091
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
					-830.0002786442731,
					-344.2623521063101
				]
			]
		},
		{
			"type": "arrow",
			"version": 1673,
			"versionNonce": 355453036,
			"isDeleted": false,
			"id": "r0uD5kXwIYeT69WgT-L92",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1612.718839310778,
			"y": 723.2359206761198,
			"strokeColor": "#c92a2a",
			"backgroundColor": "transparent",
			"width": 422.0507148825807,
			"height": 7.924595077334516,
			"seed": 1005999694,
			"groupIds": [
				"3hwKX12qcsKRwXMLG3t6B",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1680002659533,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "DG_iHMCPi26gWMC5Y8vJC",
				"focus": -0.11325760161500814,
				"gap": 14.31501479734277
			},
			"endBinding": {
				"elementId": "I9ozIFVHYV3NtczlxwbNH",
				"focus": 0.03573469272166785,
				"gap": 13.375054697061387
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
					-422.0507148825807,
					-7.924595077334516
				]
			]
		},
		{
			"type": "rectangle",
			"version": 531,
			"versionNonce": 240859092,
			"isDeleted": false,
			"id": "K6BBNsyN1pcwBu9akXQ94",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 580.1234205094161,
			"y": 1587.7113253201344,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 3562.8100585937495,
			"height": 591.2592569986978,
			"seed": 912175314,
			"groupIds": [
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false
		},
		{
			"type": "text",
			"version": 256,
			"versionNonce": 32759660,
			"isDeleted": false,
			"id": "40r10j1m",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 761.560052120866,
			"y": 1636.3652178947798,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 410.29193115234375,
			"height": 43.199999999999996,
			"seed": 942422862,
			"groupIds": [
				"RkyEaR5JgDsJuLon75wb_",
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 36,
			"fontFamily": 1,
			"text": "mount 时调用 useState",
			"rawText": "mount 时调用 useState",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "mount 时调用 useState"
		},
		{
			"type": "rectangle",
			"version": 305,
			"versionNonce": 793582932,
			"isDeleted": false,
			"id": "1I-4XE1l8_I1hCbuza4WW",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 738.1457797216555,
			"y": 1716.8038342719572,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 764.8289998372398,
			"height": 352.19970703125,
			"seed": 908271954,
			"groupIds": [
				"RkyEaR5JgDsJuLon75wb_",
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "NvazfOVHN-ubGq4kgZkUu",
					"type": "arrow"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 297,
			"versionNonce": 1944474324,
			"isDeleted": false,
			"id": "YmaXtp2Y",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 771.9011711604579,
			"y": 1821.1576347276864,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 688.139892578125,
			"height": 86.39999999999999,
			"seed": 1984101138,
			"groupIds": [
				"RkyEaR5JgDsJuLon75wb_",
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 36,
			"fontFamily": 1,
			"text": "FC mount 时创建 useState，挂载到全局\n数据共享层",
			"rawText": "FC mount 时创建 useState，挂载到全局\n数据共享层",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "FC mount 时创建 useState，挂载到全局\n数据共享层"
		},
		{
			"type": "rectangle",
			"version": 492,
			"versionNonce": 1652290668,
			"isDeleted": false,
			"id": "vvEF3wUW-PGPzcNidrnN4",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1844.7405544485214,
			"y": 1726.9971559388152,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 588.4934488932292,
			"height": 347.88594563802076,
			"seed": 1065701774,
			"groupIds": [
				"JvaMEtDWdWaWXA0U-QEie",
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "NvazfOVHN-ubGq4kgZkUu",
					"type": "arrow"
				},
				{
					"id": "mk7k2f9aWDQzUKhCM1m4P",
					"type": "arrow"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 299,
			"versionNonce": 1604758996,
			"isDeleted": false,
			"id": "gGBNUs0W",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1881.924299584718,
			"y": 1803.8067059062632,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 516.347900390625,
			"height": 86.39999999999999,
			"seed": 556685902,
			"groupIds": [
				"JvaMEtDWdWaWXA0U-QEie",
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 36,
			"fontFamily": 1,
			"text": "React.useState 从共享层拿到\nuseState 的方法",
			"rawText": "React.useState 从共享层拿到\nuseState 的方法",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "React.useState 从共享层拿到\nuseState 的方法"
		},
		{
			"type": "rectangle",
			"version": 739,
			"versionNonce": 1438828908,
			"isDeleted": false,
			"id": "d4FVqj8nCKTpAaih_YbkP",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2804.3117275506165,
			"y": 1669.59325169319,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 1238.1742350260417,
			"height": 460.55358325911675,
			"seed": 1378647502,
			"groupIds": [
				"z2gbVxsEo3cxdg6lGdBVV",
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [
				{
					"id": "mk7k2f9aWDQzUKhCM1m4P",
					"type": "arrow"
				}
			],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"customData": {
				"legacyTextWrap": true
			}
		},
		{
			"type": "text",
			"version": 751,
			"versionNonce": 469679084,
			"isDeleted": false,
			"id": "1yI9E2kn",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2897.049115857104,
			"y": 1722.8229644346086,
			"strokeColor": "#e67700",
			"backgroundColor": "transparent",
			"width": 1073.1956787109375,
			"height": 345.59999999999997,
			"seed": 322801170,
			"groupIds": [
				"z2gbVxsEo3cxdg6lGdBVV",
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": null,
			"boundElements": [],
			"updated": 1680002659328,
			"link": null,
			"locked": false,
			"fontSize": 36,
			"fontFamily": 1,
			"text": "fiber---> hooks ---> updateQueue ---> update ---> action\n创建一个 hooks 的链表\n1. 与当前 fiber 关联，fiber.m = hooks\n2. 关联一个 updateQueue, hoos.updateQueue = updateQueue\n3. 根据用户传递的 fn 创建一个 update\n4. updateQueue 添加 update\n5. 调度更新\n",
			"rawText": "fiber---> hooks ---> updateQueue ---> update ---> action\n创建一个 hooks 的链表\n1. 与当前 fiber 关联，fiber.m = hooks\n2. 关联一个 updateQueue, hoos.updateQueue = updateQueue\n3. 根据用户传递的 fn 创建一个 update\n4. updateQueue 添加 update\n5. 调度更新\n",
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": "fiber---> hooks ---> updateQueue ---> update ---> action\n创建一个 hooks 的链表\n1. 与当前 fiber 关联，fiber.m = hooks\n2. 关联一个 updateQueue, hoos.updateQueue = updateQueue\n3. 根据用户传递的 fn 创建一个 update\n4. updateQueue 添加 update\n5. 调度更新\n"
		},
		{
			"type": "arrow",
			"version": 678,
			"versionNonce": 57924332,
			"isDeleted": false,
			"id": "NvazfOVHN-ubGq4kgZkUu",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 1526.16977902218,
			"y": 1900.9928686397577,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 297.00144659069065,
			"height": 3.706343568730972,
			"seed": 1685506510,
			"groupIds": [
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1680002659534,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "1I-4XE1l8_I1hCbuza4WW",
				"focus": 0.016738318347272553,
				"gap": 23.194999463284546
			},
			"endBinding": {
				"elementId": "vvEF3wUW-PGPzcNidrnN4",
				"focus": -0.04335343903317368,
				"gap": 21.56932883565105
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
					297.00144659069065,
					3.706343568730972
				]
			]
		},
		{
			"type": "arrow",
			"version": 780,
			"versionNonce": 1687264620,
			"isDeleted": false,
			"id": "mk7k2f9aWDQzUKhCM1m4P",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"angle": 0,
			"x": 2453.156498767765,
			"y": 1894.423106086976,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"width": 338.9611402974019,
			"height": 5.245220772495259,
			"seed": 1634201554,
			"groupIds": [
				"C6l1BWjkt_p2Ty73OHtEG",
				"FH2HW8AKqDtiSFvr7NWKI",
				"NioZyPpa9nacQmmys-b1_"
			],
			"roundness": {
				"type": 2
			},
			"boundElements": [],
			"updated": 1680002659534,
			"link": null,
			"locked": false,
			"startBinding": {
				"elementId": "vvEF3wUW-PGPzcNidrnN4",
				"focus": -0.06374701077294646,
				"gap": 19.922495426014166
			},
			"endBinding": {
				"elementId": "d4FVqj8nCKTpAaih_YbkP",
				"focus": -0.03988622627132506,
				"gap": 12.19408848544981
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
					338.9611402974019,
					5.245220772495259
				]
			]
		},
		{
			"id": "bIqcw4TT",
			"type": "text",
			"x": 4831.786711661999,
			"y": 2410.534719017995,
			"width": 18,
			"height": 43.199999999999996,
			"angle": 0,
			"strokeColor": "#087f5b",
			"backgroundColor": "transparent",
			"fillStyle": "hachure",
			"strokeWidth": 4,
			"strokeStyle": "solid",
			"roughness": 1,
			"opacity": 100,
			"groupIds": [],
			"roundness": null,
			"seed": 1234066924,
			"version": 2,
			"versionNonce": 595576532,
			"isDeleted": true,
			"boundElements": null,
			"updated": 1680002656798,
			"link": null,
			"locked": false,
			"text": "",
			"rawText": "",
			"fontSize": 36,
			"fontFamily": 1,
			"textAlign": "left",
			"verticalAlign": "top",
			"containerId": null,
			"originalText": ""
		}
	],
	"appState": {
		"theme": "light",
		"viewBackgroundColor": "#ffffff",
		"currentItemStrokeColor": "#087f5b",
		"currentItemBackgroundColor": "transparent",
		"currentItemFillStyle": "hachure",
		"currentItemStrokeWidth": 4,
		"currentItemStrokeStyle": "solid",
		"currentItemRoughness": 1,
		"currentItemOpacity": 100,
		"currentItemFontFamily": 1,
		"currentItemFontSize": 36,
		"currentItemTextAlign": "left",
		"currentItemStartArrowhead": null,
		"currentItemEndArrowhead": "arrow",
		"scrollX": 789.1371435960064,
		"scrollY": 769.5859513966252,
		"zoom": {
			"value": 0.26054435849189744
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