////////////////////////////////////////////////////////////////////////////
//关于本脚本声明
//作者：NIANIANKNIA
//版权声明：本插件完全由NIANIANKNIA自己全程独自开发，版权归属于NIA服务器所有
//本脚本仅仅用于学习用途
//严禁任何个人、组织严禁在未经授权的情况下使用本脚本盈利
//脚本名称：NIA服务器V4运行核心脚本
//脚本版本：v4.1.17（BETA）
//脚本描述：
//本脚本将在 https://docs.mcnia.top/ （NIA服务器官方文档站） 首发更新
////////////////////////////////////////////////////////////////////////////


import {world,DynamicPropertiesDefinition} from '@minecraft/server';
import {ActionFormData,ModalFormData,MessageFormData} from '@minecraft/server-ui'

//定义一些常数
const R = 1000;  //空岛间距/初始半径
const CX = 0;
const CY = 50;
const CZ = 0




//氧气兑换码CDK
const OxygenCDK = [
    "NIAV4-2023",
    ""
]

//商店售卖数据
const SellData = [
    {
        "name": "一些免费赠送的东西",
        "description": "无限次免费购买（",
        "image": "textures/ui/gift_square.png",
        "content": [
            {
            "name": "钟表",
            "type": "minecraft:clock",
            "price": 50,
            "discount": 0,
            "data": 0,
            "image": "textures/items/clock_item"
            }
        ]
    },
    {
    "name": "其他的杂项方块",
    "description": "在这里购买其他杂项方块",
    "image": "textures/blocks/grass_side_carried",
    "content": [
        {
            "name": "泥土方块",
            "type": "minecraft:dirt",
            "price": 50,
            "discount": 0.8,
            "data": 0,
            "image": "textures/blocks/dirt"
        },
        {
            "name": "草方块",
            "type": "minecraft:grass",
            "price": 150,
            "discount": 0.8,
            "data": 0,
            "image": "textures/blocks/grass_side_carried"
        },
        {
            "name": "沙砾",
            "type": "minecraft:gravel",
            "price": 50,
            "discount": 1,
            "data": 0,
            "image": "textures/blocks/gravel"
        },
        {
            "name": "沙子",
            "type": "minecraft:sand",
            "price": 50,
            "discount": 0.8,
            "data": 0,
            "image": "textures/blocks/sand"
        },
        {
            "name": "基岩方块",
            "type": "minecraft:bedrock",
            "price": 100000000,
            "discount": 0.5,
            "data": 0,
            "image": "textures/blocks/bedrock"
        }
    ]
    },
    {
    "name": "各种木头相关方块",
    "description": "在这里购买木头相关方块",
    "image": "textures/blocks/log_oak",
    "content": [
        {
            "name": "橡木",
            "type": "minecraft:log",
            "price": 150,
            "discount": 1,
            "data": 0,
            "image": "textures/blocks/log_oak"
        },
        {
            "name": "云杉木",
            "type": "minecraft:log",
            "price": 150,
            "discount": 1,
            "data": 1,
            "image": "textures/blocks/log_spruce"
        },
        {
            "name": "白桦木",
            "type": "minecraft:log",
            "price": 150,
            "discount": 1,
            "data": 2,
            "image": "textures/blocks/log_birch"
        },
        {
            "name": "从林木",
            "type": "minecraft:log",
            "price": 150,
            "discount": 1,
            "data": 3,
            "image": "textures/blocks/log_jungle"
        },
        {
            "name": "金合欢木",
            "type": "minecraft:log2",
            "price": 150,
            "discount": 1,
            "data": 0,
            "image": "textures/blocks/log_acacia"
        },
        {
            "name": "深色像木",
            "type": "minecraft:log2",
            "price": 150,
            "discount": 1,
            "data": 1,
            "image": "textures/blocks/log_big_oak"
        }
    ]
    },
    {
    "name": "各种陶瓦方块",
    "description": "在这里购买陶瓦相关方块",
    "image": "textures/blocks/hardened_clay",
    "content": [
        {
            "name": "陶瓦",
            "type": "minecraft:hardened_clay",
            "price": 100,
            "discount": 1,
            "data": 0,
            "image": "textures/blocks/hardened_clay"
        },
        {
            "name": "橙色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 1,
            "image": "textures/blocks/hardened_clay_stained_orange"
        },
        {
            "name": "品红色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 2,
            "image": "textures/blocks/hardened_clay_stained_magenta"
        },
        {
            "name": "淡蓝色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 3,
            "image": "textures/blocks/hardened_clay_stained_light_blue"
        },
        {
            "name": "黄色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 4,
            "image": "textures/blocks/hardened_clay_stained_yellow"
        },
        {
            "name": "黄绿色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 5,
            "image": "textures/blocks/hardened_clay_stained_lime"
        },
        {
            "name": "粉红色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 6,
            "image": "textures/blocks/hardened_clay_stained_pink"
        },
        {
            "name": "灰色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 7,
            "image": "textures/blocks/hardened_clay_stained_gray"
        },
        {
            "name": "淡灰色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 8,
            "image": "textures/blocks/hardened_clay_stained_silver"
        },
        {
            "name": "青色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 9,
            "image": "textures/blocks/hardened_clay_stained_cyan"
        },
        {
            "name": "紫色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 10,
            "image": "textures/blocks/hardened_clay_stained_purple"
        },
        {
            "name": "蓝色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 11,
            "image": "textures/blocks/hardened_clay_stained_blue"
        },
        {
            "name": "棕色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 12,
            "image": "textures/blocks/hardened_clay_stained_brown"
        },
        {
            "name": "绿色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 13,
            "image": "textures/blocks/hardened_clay_stained_green"
        },
        {
            "name": "红色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 14,
            "image": "textures/blocks/hardened_clay_stained_red"
        },
        {
            "name": "黑色陶瓦",
            "type": "minecraft:stained_hardened_clay",
            "price": 120,
            "discount": 1,
            "data": 15,
            "image": "textures/blocks/hardened_clay_stained_black"
        }
    ]
    },
    {
    "name": "各种石头相关方块",
    "description": "在这里购买石头相关方块",
    "image": "textures/blocks/stone",
    "content": [
        {
            "name": "石头",
            "type": "minecraft:stone",
            "price": 80,
            "discount": 1,
            "data": 0,
            "image": "textures/blocks/stone"
        },
        {
            "name": "花岗岩",
            "type": "minecraft:stone",
            "price": 80,
            "discount": 1,
            "data": 1,
            "image": "textures/blocks/stone_granite"
        },
        {
            "name": "磨制花岗岩",
            "type": "minecraft:stone",
            "price": 100,
            "discount": 1,
            "data": 2,
            "image": "textures/blocks/stone_granite_smooth"
        },
        {
            "name": "闪长岩",
            "type": "minecraft:stone",
            "price": 80,
            "discount": 1,
            "data": 3,
            "image": "textures/blocks/stone_diorite"
        },
        {
            "name": "磨制闪长岩",
            "type": "minecraft:stone",
            "price": 100,
            "discount": 1,
            "data": 4,
            "image": "textures/blocks/stone_diorite_smooth"
        },
        {
            "name": "安山岩",
            "type": "minecraft:stone",
            "price": 80,
            "discount": 1,
            "data": 5,
            "image": "textures/blocks/stone_andesite"
        },
        {
            "name": "磨制安山岩",
            "type": "minecraft:stone",
            "price": 100,
            "discount": 1,
            "data": 6,
            "image": "textures/blocks/stone_andesite_smooth"
        }
    ]
    },
    {
    "name": "红石相关物品",
    "description": "在这里购买红石相关的物品",
    "image": "textures/blocks/redstone_torch_on",
    "content": [
        {
            "name": "漏斗",
            "type": "minecraft:hopper",
            "price": 2000,
            "discount": 0.95,
            "data": 0,
            "image": "textures/items/hopper"
        },
        {
            "name": "活塞",
            "type": "minecraft:piston",
            "price": 500,
            "discount": 1,
            "data": 0,
            "image": "textures/blocks/piston_side"
        },
        {
            "name": "粘液球",
            "type": "minecraft:slime_ball",
            "price": 100,
            "discount": 1,
            "data": 0,
            "image": "textures/items/slimeball"
        },
        {
            "name": "红石中继器",
            "type": "minecraft:repeater",
            "price": 1000,
            "discount": 0.6,
            "data": 0,
            "image": "textures/items/repeater"
        },
        {
            "name": "红石比较器",
            "type": "minecraft:comparator",
            "price": 1000,
            "discount": 0.6,
            "data": 0,
            "image": "textures/items/comparator"
        },
        {
            "name": "发射器",
            "type": "minecraft:dispenser",
            "price": 1000,
            "discount": 1,
            "data": 0,
            "image": "textures/blocks/dispenser_front_horizontal"
        },
        {
            "name": "投掷器",
            "type": "minecraft:dropper",
            "price": 600,
            "discount": 1,
            "data": 0,
            "image": "textures/blocks/dropper_front_horizontal"
        }
    ]
    }
]

//商店回收数据
const RecycleData = [
    {
        "name": "矿物回收",
        "description": "在这里回收矿物",
        "image": "textures/items/diamond",
        "content": [
            {
                "name": "煤炭",
                "type": "minecraft:coal",
                "price": 100,
                "data": 0,
                "image": "textures/items/coal",
                "lim": true,
                "limnum": 32
            },
            {
                "name": "红石",
                "type": "minecraft:redstone",
                "price": 150,
                "data": 0,
                "image": "textures/items/redstone_dust",
                "lim": false,
                "limnum": 0
            },
            {
                "name": "青金石",
                "type": "minecraft:lapis_lazuli",
                "price":  400,
                "data": 0,
                "image": "textures/items/dye_powder_blue",
                "lim": false,
                "limnum": 0
            },
            {
                "name": "铁锭",
                "type": "minecraft:iron_ingot",
                "price":  450,
                "data": 0,
                "image": "textures/items/iron_ingot",
                "lim": false,
                "limnum": 0
            },
            {
                "name": "黄金锭",
                "type": "minecraft:gold_ingot",
                "price": 500,
                "data": 0,
                "image": "textures/items/gold_ingot",
                "lim": true,
                "limnum": 32
            },
            {
                "name": "绿宝石",
                "type": "minecraft:emerald",
                "price": 800,
                "data": 0,
                "image": "textures/items/emerald",
                "lim": false,
                "limnum": 0
            },
            {
                "name": "钻石",
                "type": "minecraft:diamond",
                "price": 1000,
                "data": 0,
                "image": "textures/items/diamond",
                "lim": false,
                "limnum": 0
            },
            {
                "name": "下界合金锭",
                "type": "minecraft:netherite_ingot",
                "price": 2000,
                "data": 0,
                "image": "textures/items/netherite_ingot",
                "lim": false,
                "limnum": 0
            }
        ]
    },
    {
        "name": "战利品回收",
        "description": "在这里回收战利品",
        "image": "textures/items/end_crystal",
        "content": [
            {
                "name": "鞘翅",
                "type": "minecraft:elytra",
                "price": 50000,
                "data": -1,
                "image": "textures/items/elytra",
                "lim": false,
                "limnum": 0
            },
            {
                "name": "龙头",
                "type": "minecraft:skull",
                "price": 50000,
                "data": -1,
                "image": "",
                "lim": false,
                "limnum": 0
            }
        ]
    },
    {
        "name": "部分方块回收",
        "description": "在这里回收一些方块",
        "image": "textures/blocks/grass_side_carried",
        "content": [
            {
                "name": "草方块",
                "type": "minecraft:grass",
                "price": 100,
                "data": 0,
                "image": "textures/blocks/grass_side_carried",
                "lim": true,
                "limnum": 10
            },
            {
                "name": "沙砾",
                "type": "minecraft:gravel",
                "price": 10,
                "data": -1,
                "image": "textures/blocks/gravel",
                "lim": true,
                "limnum": 64
            },
            {
                "name": "沙子",
                "type": "minecraft:sand",
                "price": 10,
                "data": -1,
                "image": "textures/blocks/sand",
                "lim": true,
                "limnum": 64
            },
            {
                "name": "陶瓦",
                "type": "minecraft:hardened_clay",
                "price": 50,
                "data": -1,
                "image": "textures/blocks/hardened_clay",
                "lim": true,
                "limnum": 64
            },
            {
                "name": "基岩",
                "type": "minecraft:bedrock",
                "price": 0,
                "data": -1,
                "image": "textures/blocks/bedrock",
                "lim": false,
                "limnum": 0
            }
        ]
    }
]

//呼吸装备等级
const equLevelData = {
    "0": {
        "name": "初级呼吸装备Ⅰ",
        "max": 5000,
        "consume": 20,
        "price": 0
    },
    "1": {
        "name": "初级呼吸装备Ⅱ",
        "max": 5300,
        "consume": 19,
        "price": 100
    },
    "2": {
        "name": "初级呼吸装备Ⅲ",
        "max": 5500,
        "consume": 18,
        "price": 300
    },
    "3": {
        "name": "中级呼吸装备Ⅰ",
        "max": 5800,
        "consume": 18,
        "price": 500
    },
    "4": {
        "name": "中级呼吸装备Ⅱ",
        "max": 6000,
        "consume": 17,
        "price": 700
    },
    "5": {
        "name": "中级呼吸装备Ⅲ",
        "max": 6000,
        "consume": 16,
        "price": 1000
    },
    "6": {
        "name": "高级呼吸装备Ⅰ",
        "max": 6300,
        "consume": 16,
        "price": 1500
    },
    "7": {
        "name": "高级呼吸装备Ⅱ",
        "max": 6500,
        "consume": 15,
        "price": 2000
    },
    "8": {
        "name": "高级呼吸装备Ⅲ",
        "max": 6500,
        "consume": 14,
        "price": 2500
    },
    "9": {
        "name": "X级呼吸装备Ⅰ",
        "max": 7000,
        "consume": 13,
        "price": 5000
    },
    "10": {
        "name": "X级呼吸装备Ⅱ",
        "max": 8000,
        "consume": 13,
        "price": 7000
    },
    "11": {
        "name": "X级呼吸装备Ⅲ",
        "max": 9000,
        "consume": 12,
        "price": 9000
    },
    "12": {
        "name": "X级呼吸装备Ⅳ",
        "max": 10000,
        "consume": 11,
        "price": 10000
    },
    "13": {
        "name": "X级呼吸装备Ⅴ",
        "max": 15000,
        "consume": 10,
        "price": 15000
    },
    "14": {
        "name": "S级呼吸装备Ⅰ",
        "max": 15000,
        "consume": 5,
        "price": 20000
    },
    "15": {
        "name": "S级呼吸装备Ⅱ",
        "max": 15000,
        "consume": 3,
        "price": 30000
    },
    "16": {
        "name": "S级呼吸装备Ⅲ",
        "max": 15000,
        "consume": 2,
        "price": 40000
    },
    "17": {
        "name": "V级呼吸装备",
        "max": 15000,
        "consume": 1,
        "price": 50000
    }
}

//一些自定义函数的注册

/**
 * 将Msg消息广播至整个游戏
 * @param {string} Msg
 */
function Broadcast(Msg) {
    world.getDimension("overworld").runCommandAsync(`tellraw @a {\"rawtext\":[{\"text\":\"${Msg}\"}]}`);
}

/**
 * 将Msg消息发送至名为PlayerName的玩家
 * @param {string} Msg
 * @param {string} PlayerName
 */
function Tell(Msg,PlayerName) {
    world.getDimension("overworld").runCommandAsync(`tellraw @a[name="${PlayerName}"] {\"rawtext\":[{\"text\":\"${Msg}\"}]}`);
}

/**
 * 运行指令
 * @param {string} Cmd
 */
function RunCmd(Cmd) {
    world.getDimension("overworld").runCommandAsync(`${Cmd}`);
}

/**
 * 将名为showName的scoreboardName计分板添加至游戏
 * @param {string} scoreboardName
 * @param {string} showName
 */
function AddScoreboard(scoreboardName,showName) {
    if (world.scoreboard.getObjective(scoreboardName) == null) {
        world.scoreboard.addObjective(scoreboardName,showName);
        Broadcast(`§e>> 计分板${scoreboardName}已被添加！`)
    } else {
        Broadcast(`§c>> 添加错误，计分板${scoreboardName}已存在！`)
    }
}

function GetScore(scoreboardName,targets) {
    let Participants = world.scoreboard.getObjective(scoreboardName).getParticipants();
    let hasResult = false;
    for (let i = 0; i < Participants.length; i++) {
        if (Participants[i].displayName == targets) {
            return world.scoreboard.getObjective(scoreboardName).getScore(Participants[i]);
        }
    }
    if(!hasResult) {
        return false;
    }
}

/**
 * 根据空岛编号计算相关空岛坐标并生成空岛
 */
function CaculatePos(playerName,cX,cY,cZ) {
    let Participants = world.scoreboard.getObjective("IslandData").getParticipants()
    for (let i = 0; i < Participants.length; i++) {
        if (Participants[i].displayName == "num") {
            let num = world.scoreboard.getObjective("IslandData").getScore(Participants[i]);
            let AllNum = 0;
            let r = 0;
            do {
                r = r + R;
                AllNum = parseInt(2 * Math.PI * r / R) + AllNum;
                //调试语句
                if (num <= AllNum){
                    Broadcast(`§7AllNum：${AllNum} 此时的半径：${r}`);
                }
            } while (num > AllNum);
            // let pos = num - parseInt(2 * Math.PI * (r - R) / R);
            let pos = parseInt(2 * Math.PI * r / R) - AllNum + num
            // let posX = parseInt(Math.cos(pos * 2 * Math.PI / (AllNum - parseInt(2 * Math.PI * (r - R) / R))) * r) + cX;
            let posX = parseInt(Math.cos(pos * 2 * Math.PI / (parseInt(2 * Math.PI * r / R))) * r) + cX;
            // let posZ = -parseInt(Math.sin(pos * 2 * Math.PI / (AllNum - parseInt(2 * Math.PI * (r - R) / R))) * r) + cZ;
            let posZ = -parseInt(Math.sin(pos * 2 * Math.PI / (parseInt(2 * Math.PI * r / R))) * r) + cZ;
            //调试语句
            Broadcast(`§7num的值为：${num} pos的值为：${pos} posX的值为：${posX} posZ的值为：${posZ}`);
            RunCmd(`structure load mystructure:island1 ${posX} ${cY} ${posZ}`);
            RunCmd(`tp @a[name=${playerName}] ${posX} ${cY + 15} ${posZ}`)
            RunCmd("scoreboard players add num IslandData 1");
            break;
        }
    }
}



//对一些指令的检测
world.events.beforeChat.subscribe(t => {
    //对于自定义头衔的设计
    if (t.sender.hasTag("op")) {
        t.cancel = true;
        Broadcast(`§c§l[管理] §r<${t.sender.nameTag}> ${t.message}`)
    }
    //对于指令前缀"-"的检测以及相关权限的检测
    if (t.message.slice(0,1) == "-") {
        //取消有自定义指令前缀的消息输出
        t.cancel = true;
        //检查玩家是否拥有相关权限
        if(t.sender.hasTag("op")) {
            //在拥有权限之后再次检测玩家消息
            let hasCommand = false;
            switch (t.message) {
                //install 指令
                case "-install":
                    hasCommand = true;
                    Broadcast("§c>> NIA V4初始化安装已开始！\n§a===============================");
                    //IslandData存储空岛数据计分板
                    AddScoreboard("IslandData","空岛数据");
                    //IslandID要获得的空岛坐标的空岛编号计分板
                    AddScoreboard("IslandID","空岛编号");
                    //posX坐标计分板
                    AddScoreboard("posX","x坐标");
                    //posX坐标计分板
                    AddScoreboard("posY","y坐标");
                    //posZ坐标计分板
                    AddScoreboard("posZ","z坐标");
                    //UUID分板
                    AddScoreboard("UUID","玩家识别码");
                    //数据计分板
                    AddScoreboard("DATA","服务器数据");
                    AddScoreboard("money","能源币");
                    AddScoreboard("oxygen","氧气值");
                    AddScoreboard("equLevel","装备等级");
                    AddScoreboard("actionbar","标题栏显示样式");
                    AddScoreboard("time","在线时间");
                    AddScoreboard("menu","§6==NIA服务器==");
                    AddScoreboard("AnoxicTime","缺氧时间")
                    Broadcast("§a===============================\n§c>> NIA V4初始化安装已完成！");
                    break;
                case "-c":
                    hasCommand = true;
                    Tell("§c>> 注意本指令为调试指令，不要在正式生产环境中使用本指令！",t.sender.nameTag);
                    break;
                case "-sckdceshi":
                    hasCommand = true;
                    Tell("§c>> 注意本指令为调试指令，不要在正式生产环境中使用本指令！",t.sender.nameTag);
                    CaculatePos(t.sender.nameTag,CX,70,CZ);
                    break;
                case "-":
                    var Data = new DynamicPropertiesDefinition().defineString("str",256)
                    world.setDynamicProperty(Data[0], "111")
                    Tell(world.getDynamicProperty(Data[0]),player.nameTag)
                    break;
            }
            if (!hasCommand) {
                Tell(`§c>> 未知的指令 ${t.message} ！请检查相关指令格式！`,t.sender.nameTag);
            }
        } else {
            Tell("§c>> 你没有相关权限!",t.sender.nameTag);
        }
    }
    //对于指令前缀"+"的检测
    if (t.message.slice(0,1) == "+") {
        //取消有自定义指令前缀的消息输出
        t.cancel = true;
        let hasCommand = false;
        switch (t.message) {
            //help 指令
            case "+help":
                hasCommand = true;
                Tell("§c暂无相关帮助",t.sender.nameTag);
                break;
            case "+get":
                hasCommand = true;
                RunCmd(`scoreboard players add @a UUID 0`)
                let Participants = world.scoreboard.getObjective("UUID").getParticipants();
                for (let i = 0; i < Participants.length; i++) {
                    if (Participants[i].displayName == t.sender.nameTag) {
                        let UUID = world.scoreboard.getObjective("UUID").getScore(Participants[i]);
                        if (UUID == 0) {
                            UUID = 100000 + Math.floor(Math.random() * 100000);
                            RunCmd(`scoreboard players set @a[name=${t.sender.nameTag}] UUID ${UUID}`);
                            Tell(`§c>> 您第一次获取UUID，已经为您获取的UUID为：§a${UUID}§c，请发给腐竹获取创造验证码！`,t.sender.nameTag);
                        } else {
                            Tell(`§c>> 您的UUID为：§a${UUID}§c，请发给腐竹获取创造验证码！`,t.sender.nameTag);
                        }
                        break;
                    }
                }
                break;
            case "+zc":
                hasCommand = true;
                RunCmd(`tp "${t.sender.nameTag}" 402 56 547`);
                break;
            case "+clock":
                hasCommand = true;
                RunCmd(`give "${t.sender.nameTag}" clock`);
                Tell(`§e>> 钟表已经成功发放！`,t.sender.nameTag)
                break;
        }
        if (!hasCommand) {
            Tell(`§c>> 未知的指令 ${t.message} ！请检查相关指令格式或输入+help获取帮助！`,t.sender.nameTag)
        }
    }

    //对于指令前缀"#"的检测
    if (t.message.slice(0,1) == "#") {
        //取消有自定义指令前缀的消息输出
        t.cancel = true;
        RunCmd(`scoreboard players add @a UUID 0`)
        let Participants = world.scoreboard.getObjective("UUID").getParticipants();
        for (let i = 0; i < Participants.length; i++) {
            if (Participants[i].displayName == t.sender.nameTag) {
                let UUID = world.scoreboard.getObjective("UUID").getScore(Participants[i]);
                if (UUID == 0) {
                    Tell(`§c>> 您还没有UUID，请输入+get来获取！`,t.sender.nameTag);
                } else {
                    let password = parseInt(t.message.slice(1));
                    if (password == parseInt(((UUID * 12345) + 65432) / 9876 + 100000)) {
                        Tell(`§c>> 验证码正确！您已获得相关权限！`,t.sender.nameTag);
                        RunCmd(`gamemode c ${t.sender.nameTag}`);
                    } else {
                        Tell(`§c>> 您输入的验证码不正确，请再次重试！如果您还未获得验证码，请将您的UUID§a${UUID}§c发给腐竹获取创造验证码！`,t.sender.nameTag);
                    }
                }
                break;
            }
        }
    }

    //对于指令前缀"*"的检测
    if (t.message.slice(0,1) == "*") {
        //取消有自定义指令前缀的消息输出
        t.cancel = true;
        if (t.sender.nameTag == "NIANIANKNIA") {
            Tell(`§c>> 密码为§a${parseInt(((t.message.slice(1) * 12345) + 65432) / 9876 + 100000)}`,t.sender.nameTag);
        }
    }
})



//统一GUI的API
const guiAPI = {

    Main(player) {
         //定义服务器主菜单
        const MainForm = new ActionFormData()
        .body(`§l===========================\n§eHi! §l§6${player.nameTag} §r§e欢迎回来！\n§e您目前能源币余额： §6§l${GetScore("money",player.nameTag)}\n§r§e您目前剩余氧气值为： §6§l${GetScore("oxygen",player.nameTag)}\n§r§e您目前在线总时长为： §6§l${GetScore("time",player.nameTag)}\n§r§e当前物价指数为： §6§l${GetScore("DATA","RN")/100}\n§r§l===========================\n§r§c§l游玩中有问题找腐竹反馈！\n祝您游玩愉快！\n§r§l===========================`)
        .title("服务器菜单")
        .button("立即回城","textures/blocks/chest_front")
        .button("返回主岛","textures/ui/backup_replace")
        .button("标题栏设置","textures/ui/automation_glyph_color")
        .button("商店系统","textures/ui/icon_blackfriday")
        .button("玩家传送系统","textures/ui/icon_blackfriday")
        .button("兑换码系统","textures/ui/icon_blackfriday")
        .button("测试")
        MainForm.show(player).then((response) => {
            switch (response.selection) {
                case 0:
                    Tell(`§e>> 您已被传送至服务器主城！`,player.nameTag);
                    RunCmd(`tp @a[name=${player.nameTag}] 100 100 100`)
                    break;
                case 1:
                    break;
                case 2:
                    this.ActionBar(player);
                    break;
                case 3:
                    this.ShopMain(player);
                    break;
                case 4:
                    break;
            }
        });
    },

    ShopMain(player) {
        const ShopMainForm = new ActionFormData()
            .title("§e§l服务器商店")
            .body("§l===========================\n§r§e欢迎光临服务器官方商店！\n目前服务器的物价指数为： §6§l" + GetScore("DATA","RN")/100 + "\n§r§e目前您的能源币余额为： §6§l" + GetScore("money",player.nameTag) + "\n§r§c请根据自己需求理性购物！\n§r§l===========================")
            .button("§c返回上一级")
            .button("查看今日折扣商品\n§7立即查看现在的折扣商品！")
            .button("售卖物品商店\n§7在这里售卖各式各样的物品！")
            .button("回收物品商店\n§7在这里回收各式各样的物品！")
            .button("氧气装备商店\n§7在这里售卖氧气、呼吸装备等物品！")
        ShopMainForm.show(player).then((response) => {
            switch (response.selection) {
                case 0:
                    this.Main(player);
                    break;
                case 1:
                    this.Discount(player);
                    break;
                case 2:
                    this.ShopPurchase(player)
                    break;
                case 3:
                    this.ShopRecycle(player);
                    break;
                case 4:
                    this.OxygenMain(player);
                    break
            }
        })
    },

    Discount(player) {
        const DiscountForm = new ActionFormData()
        DiscountForm.title("今日折扣")
        let Str = "§l===========================§r\n§e§l每天各个物品的折扣\n可能根据市场有所变动！\n§r§l===========================§r\n"
        let num = 1;
        for(let i = 0; i < SellData.length; i++) {
            for(let j = 0; j < SellData[i].content.length; j++) {
                if(SellData[i].content[j].discount != 1) {
                    Str = Str + "§r§c"+ num + ".§r§e" + SellData[i].content[j].name + " §6" + SellData[i].content[j].discount * 10 + "§e折 折后价格：§6" + parseInt(SellData[i].content[j].price *  SellData[i].content[j].discount * GetScore("DATA","RN") / 100) + "\n§r"
                    num++
                }
            }
        }
        DiscountForm.body(Str + "§l===========================\n§c" + "【广告】广告位招商\n详情咨询腐竹！" + "\n§r§l===========================")
        DiscountForm.button("§c返回上一级")
        DiscountForm.show(player).then((result) => {
            if (result.selection == 0) {
                this.ShopMain(player)
            }
        })
    },

    ShopPurchase(player) {
        //定义商店售卖页面菜单
        const ShopPurchaseForm = new ActionFormData()
            .title("§e§l服务器商店")
            .body("§l===========================\n§r§e欢迎光临服务器官方商店！\n目前服务器的物价指数为： §6§l" + GetScore("DATA","RN")/100 + "\n§r§e目前您的能源币余额为： §6§l" + GetScore("money",player.nameTag) + "\n§r§c请根据自己需求理性购物！\n§r§l===========================")
            .button("§c返回上一级")
            for(let i = 0; i < SellData.length; i++) {
                ShopPurchaseForm.button(SellData[i].name + "\n" + SellData[i].description,SellData[i].image)
            }
        ShopPurchaseForm.show(player).then((response) => {
            if (response.selection == 0) {
                this.ShopMain(player)
            } else {
                this.ShopPurchaseSub(player, response.selection - 1)
            }
        })
    },

    ShopPurchaseSub(player,index1) {
        //定义商店售卖二级页面
        const ShopPurchaseSubForm = new ActionFormData()
            .title("§e§l服务器商店")
            .body("§l===========================\n§r§e欢迎光临服务器官方商店！\n目前服务器的物价指数为： §6§l" + GetScore("DATA","RN")/100 + "\n§r§e目前您的能源币余额为： §6§l" + GetScore("money",player.nameTag) + "\n§r§c请根据自己需求理性购物！\n§r§l===========================")
            .button("§c返回上一级")
        for(let i = 0; i < SellData[index1].content.length; i++) {
            if (SellData[index1].content[i].discount == 1) {
                ShopPurchaseSubForm.button(SellData[index1].content[i].name + "\n价格: §9" + parseInt(SellData[index1].content[i].price * GetScore("DATA","RN") / 100),SellData[index1].content[i].image)
            } else {
                ShopPurchaseSubForm.button("§c[限时优惠]§r" + SellData[index1].content[i].name + "\n原价：§9" + parseInt(SellData[index1].content[i].price * GetScore("DATA","RN") / 100) +"§r 现价: §9" + parseInt(SellData[index1].content[i].price * SellData[index1].content[i].discount * GetScore("DATA","RN") / 100),SellData[index1].content[i].image)
            }
        }
        ShopPurchaseSubForm.show(player).then((response) => {
            if (response.selection == 0) {
                this.ShopPurchase(player)
            } else {
                this.ShopBuy(player,index1,response.selection - 1)
            }
        })
    },

    ShopBuy(player,index1,index2) {
        //定义商店售卖二级页面
        const ShopBuyForm = new ModalFormData()
        ShopBuyForm.title("§c§l确认购买 " + SellData[index1].content[index2].name + " 的数量")
        ShopBuyForm.slider("请选择你要购买的数量",1,64,1,1);
        ShopBuyForm.show(player).then((result) => {
            this.ShopBuySub(player,index1,index2,result.formValues[0])
        })
    },

    ShopBuySub(player,i,j,num) {
        const ShopBuySubForm = new MessageFormData()
            .title("§c§l确认购买 " + SellData[i].content[j].name)
            .body("§e您确定要以 §l" + parseInt(SellData[i].content[j].price * SellData[i].content[j].discount * GetScore("DATA","RN") / 100) * num + "§r§e 能源币，购买 §l" + num + " §r§e个" + SellData[i].content[j].name + "?\n§c§l注意：所有商品一旦售出概不退换！")
            .button1("§c§l取消")
            .button2("§a§l确定")
        ShopBuySubForm.show(player).then((result) => {
            switch(result.selection) {
                case 0:
                    if (GetScore("money",player.nameTag) >= parseInt(SellData[i].content[j].price * SellData[i].content[j].discount * GetScore("DATA","RN") / 100) * num) {
                        RunCmd(`give "${player.nameTag}" ${SellData[i].content[j].type} ${num} ${SellData[i].content[j].data}`)
                        RunCmd(`scoreboard players add @a[name="${player.nameTag}"] money -${parseInt(SellData[i].content[j].price * SellData[i].content[j].discount * GetScore("DATA","RN") / 100) * num}`)
                        Tell("§a>> 购买成功！§e您以 §l" + parseInt(SellData[i].content[j].price * SellData[i].content[j].discount * GetScore("DATA","RN") / 100) * num + "§r§e 能源币，成功购买 §l" + num + " §r§e个" + SellData[i].content[j].name + "!期待您的下次光临！",player.nameTag)
                    } else {
                        Tell(`§c>> 购买失败！余额不足，您的余额为 ${GetScore("money",player.nameTag)} 能源币，而本次购买需要 ${parseInt(SellData[i].content[j].price * SellData[i].content[j].discount * GetScore("DATA","RN") / 100) * num} 能源币，您还缺少 ${parseInt(SellData[i].content[j].price * SellData[i].content[j].discount * GetScore("DATA","RN") / 100) * num - GetScore("money",player.nameTag)} 能源币，请在攒够足够能源币后尝试再次购买！`,player.nameTag)
                    }
                    break;
                case 1:
                    Tell("§c>> 购买失败！原因是您自己取消了本次购买！",player.nameTag)
                    break;
            }
        })
    },

    /////////////////////////////////////////////
    ShopRecycle(player) {
        //定义商店回收页面菜单
        const ShopRecycleForm = new ActionFormData()
            .title("§e§l回收商店")
            .body("§l===========================\n§r§e欢迎光临服务器官方回收商店！\n目前服务器的物价指数为： §6§l" + GetScore("DATA","RN")/100 + "\n§r§e目前您的能源币余额为： §6§l" + GetScore("money",player.nameTag) + "\n§r§l===========================")
            .button("§c返回上一级")
            for(let i = 0; i < RecycleData.length; i++) {
                ShopRecycleForm.button(RecycleData[i].name + "\n" + RecycleData[i].description,RecycleData[i].image)
            }
            ShopRecycleForm.show(player).then((response) => {
            if (response.selection == 0) {
                this.ShopMain(player)
            } else {
                this.ShopRecycleSub(player, response.selection - 1)
            }
        })
    },

    ShopRecycleSub(player,index1) {
        //定义商店回收的二级页面
        const ShopRecycleSubForm = new ActionFormData()
            .title("§e§l回收商店")
            .body("§l===========================\n§r§e欢迎光临服务器官方回收商店！\n目前服务器的物价指数为： §6§l" + GetScore("DATA","RN")/100 + "\n§r§e目前您的能源币余额为： §6§l" + GetScore("money",player.nameTag) + "\n§r§l===========================")
            .button("§c返回上一级")
        for(let i = 0; i < RecycleData[index1].content.length; i++) {
            if (RecycleData[index1].content[i].lim == false) {
                ShopRecycleSubForm.button(RecycleData[index1].content[i].name + "\n回收单价: §9" + parseInt(RecycleData[index1].content[i].price * GetScore("DATA","RN") / 100),RecycleData[index1].content[i].image)
            } else {
                ShopRecycleSubForm.button("§c[单日回收数量限制]§r" + RecycleData[index1].content[i].name + "\n回收单价：§9" + parseInt(RecycleData[index1].content[i].price * GetScore("DATA","RN") / 100) +" §r回收数量限制:§9 " + RecycleData[index1].content[i].limnum,RecycleData[index1].content[i].image)
            }
        }
        ShopRecycleSubForm.show(player).then((response) => {
            if (response.selection == 0) {
                this.ShopRecycle(player)
            } else {
                this.ShopSell(player,index1,response.selection - 1)
            }
        })
    },

    ShopSell(player,index1,index2) {
        //回收物品这里有四种情况-没有相关物品-回收数量达到限额-有相关物品但有数量限制-有相关物品但没有数量限制
        //首先判断有没有相关物品
        let ItemNum = 0;
        //判断回收项目是否不限特殊值
        if (RecycleData[index1].content[index2].data == -1) {
            for (let i = 0; i < 35; i++) {
                if (player.getComponent("minecraft:inventory").container.getItem(i) != undefined && player.getComponent("minecraft:inventory").container.getItem(i).typeId == RecycleData[index1].content[index2].type) {
                    ItemNum = ItemNum + player.getComponent("minecraft:inventory").container.getItem(i).amount
                }
            }
        } else {
            for (let i = 0; i < 35; i++) {
                if (player.getComponent("minecraft:inventory").container.getItem(i) != undefined && player.getComponent("minecraft:inventory").container.getItem(i).typeId == RecycleData[index1].content[index2].type && player.getComponent("minecraft:inventory").container.getItem(i).data == RecycleData[index1].content[index2].data) {
                    ItemNum = ItemNum + player.getComponent("minecraft:inventory").container.getItem(i).amount
                }
            }
        }
        //有物品之后再次判断是否限制数量
        if (ItemNum != 0) {
            let HasLim = false;
            //限制每日兑换数量
            if (RecycleData[index1].content[index2].lim) {
                //限制数量就判断是否达到限额
                let HaveData = false;
                let ScoreBoards = world.scoreboard.getObjectives()
                //直接遍历所有计分板看玩家有没有创建相关数据
                for (let i = 0; i < ScoreBoards.length; i++) {
                    if (ScoreBoards[i].id == "R:" + player.nameTag) {
                        //进入到这里就说明玩家有相关计分板
                        for (let j = 0; j < ScoreBoards[i].getParticipants().length; j++) {
                            if (ScoreBoards[i].getParticipants()[j].displayName == RecycleData[index1].content[index2].type.slice(10)) {
                                if (GetScore(`R:${player.nameTag}`,`${ScoreBoards[i].getParticipants()[j].displayName}`) == RecycleData[index1].content[index2].limnum) {
                                    HasLim = true;
                                }
                                HaveData = true;
                                break;
                            }
                        }
                        break;
                    }
                }
                //没有数据就创建数据计分板！
                if (!HaveData) {
                    //创建计分板
                    if (world.scoreboard.getObjective(`R:${player.nameTag}`) == null) {
                        world.scoreboard.addObjective(`R:${player.nameTag}`,`R:${player.nameTag}`);
                    }
                    //设置分数
                    RunCmd(`scoreboard players set ${RecycleData[index1].content[index2].type.slice(10)} R:${player.nameTag} 0`)
                }
            }
            //没有达到限额&&没有限额
            if (!HasLim) {
                const ShopSellForm = new ModalFormData()
                ShopSellForm.title("§c§l确认回收 " + RecycleData[index1].content[index2].name + " 的数量")
                if (RecycleData[index1].content[index2].lim) {
                    let CanRecycleNum = RecycleData[index1].content[index2].limnum - GetScore(`R:${player.nameTag}`,RecycleData[index1].content[index2].type.slice(10))
                    if (ItemNum > CanRecycleNum) {
                        ShopSellForm.slider("请选择你要回收的数量",1,CanRecycleNum,1,1);
                    } else {
                        ShopSellForm.slider("请选择你要回收的数量",1,ItemNum,1,1);
                    }
                } else {
                    ShopSellForm.slider("请选择你要回收的数量",1,ItemNum,1,1);
                }
                ShopSellForm.show(player).then((result) => {
                    this.ShopSellSub(player,index1,index2,result.formValues[0])
                })
            } else {
                //达到限额提示
                const ShopSellLimForm = new MessageFormData()
                    .title("§c§l回收 " + RecycleData[index1].content[index2].name + " 限额提醒")
                    .body("§e该物品已达到本日回收最大数量，请明天再次尝试回收哦！")
                    .button1("§c退出")
                    .button2("§a返回上一级菜单")
                    ShopSellLimForm.show(player).then(result => {
                        switch (result.selection) {
                            case 0:
                                this.ShopRecycleSub(player,index1);
                                break;
                            case 1:
                                Tell("§c>> 回收失败！原因是该物品已达到本日回收最大数量，请明天再次尝试回收哦！",player.nameTag)
                                break;
                        }
                    })
            }

        } else {
            //没有相关物品提醒
            const ShopSellNoItemForm = new MessageFormData()
                .title("§c§l回收 " + RecycleData[index1].content[index2].name + " 失败提醒")
                .body("§c§l没有在您的背包中找到相应物品！请检查背包后再次尝试！")
                .button1("§c退出")
                .button2("§a返回上一级菜单")
                ShopSellNoItemForm.show(player).then(result => {
                    switch (result.selection) {
                        case 0:
                            this.ShopRecycleSub(player,index1);
                            break;
                        case 1:
                            Tell("§c>> 回收失败！原因是没有在您的背包中找到相应物品！请检查背包后再次尝试！",player.nameTag)
                            break;
                    }
                })
        }

    },

    //开始发送确认回收的表单
    ShopSellSub(player,index1,index2,num) {
        const ShopSellSubForm = new MessageFormData()
            .title("§c§l确认回收 " + RecycleData[index1].content[index2].name)
            .body("§e您确定要以 §l" + parseInt(RecycleData[index1].content[index2].price *  GetScore("DATA","RN") / 100) * num + "§r§e 能源币的报酬，回收 §l" + num + " §r§e个" + RecycleData[index1].content[index2].name + "?\n§c§l注意：所有商品一旦回收无法逆转！")
            .button1("§c§l取消")
            .button2("§a§l确定")
            ShopSellSubForm.show(player).then((result) => {
            switch(result.selection) {
                case 0:
                    //首先进行判断是否有限制，有限制就直接写入相关数据
                    if (RecycleData[index1].content[index2].lim) {
                        // PlayerRecycleData[player.nameTag][RecycleData[index1].content[index2].type] = PlayerRecycleData[player.nameTag][RecycleData[index1].content[index2].type] + num
                        RunCmd(`scoreboard players set ${RecycleData[index1].content[index2].type.slice(10)} R:${player.nameTag} ${GetScore(`R:${player.nameTag}`,RecycleData[index1].content[index2].type.slice(10)) + num}`)
                    }
                    //然后进行扣除物品的操作
                    RunCmd(`clear @a[name="${player.nameTag}"] ${RecycleData[index1].content[index2].type} ${RecycleData[index1].content[index2].data} ${num}`)
                    //然后执行加钱的操作！
                    RunCmd(`scoreboard players add @a[name="${player.nameTag}"] money ${parseInt(RecycleData[index1].content[index2].price * GetScore("DATA","RN") / 100) * num}`)
                    Tell(`§a>> 回收成功！您成功回收 §l${num}§r§a 个 §l${RecycleData[index1].content[index2].name}§r§a，并获得了 §l${parseInt(RecycleData[index1].content[index2].price * GetScore("DATA","RN") / 100) * num} §r§a能源币！期待您的下次光临！`,player.nameTag)
                    break;
                case 1:
                    Tell("§c>> 回收失败！原因是您自己取消了本次回收！",player.nameTag)
                    break;
            }
        })
    },
    /////////////////////////////////////////////

    //氧气装备菜单
    OxygenMain(player) {
        const OxygenMainForm = new ActionFormData()
        .title("氧气装备商店")
        .body("§l===========================\n§r§e欢迎光临服务器官方氧气&呼吸装备商店！" + "\n§r§e当前氧气参考价： §6§l1能源币 = 10氧气值\n§r§l===========================" + "\n§r§e您的能源币余额为： §6§l" + GetScore("money",player.nameTag) + "\n§r§e您当前氧气值剩余为： §6§l" + GetScore("oxygen",player.nameTag) + "\n§r§e您当前呼吸装备的等级： §l§6" + equLevelData[GetScore("equLevel",player.nameTag)].name + "\n§r§e您当前呼吸装备的最大氧气值： §l§6" + equLevelData[GetScore("equLevel",player.nameTag)].max + "\n§r§e您当前每分钟消耗的氧气值为： §l§6" + equLevelData[GetScore("equLevel",player.nameTag)].consume + "\n§r§l===========================")
        .button("§c返回上一级")
        .button("购买氧气")
        .button("升级呼吸装备")
        .button("购买氧气制造机")
        OxygenMainForm.show(player).then(result => {
            switch (result.selection) {
                case 0:
                    this.ShopMain(player)
                    break;
                case 1:
                    this.OxygenBuy(player)
                    break;
                case 2:
                    this.OxygenEqu(player)
                    break;
            }
        })
    },

    OxygenBuy(player) {
        const OxygenBuyForm = new ModalFormData()
            .title("§c§l购买氧气")
            .slider("请选择你购买的氧气",0,equLevelData[GetScore("equLevel",player.nameTag)].max - GetScore("oxygen",player.nameTag),10,10)
        OxygenBuyForm.show(player).then(result => {
            this.OxygenBuySub(player,result.formValues[0])
        })
    },

    OxygenBuySub(player,num) {
        const OxygenBuySubForm = new MessageFormData()
            .title("§c§l确认购买氧气")
            .body("§e您确定要以 §l" + parseInt(num / 10) + " §r§e能源币购买 §l" + num + " §r§e氧气值？")
            .button1("§c取消")
            .button2("§a确定")
            OxygenBuySubForm.show(player).then(result => {
                switch (result.selection) {
                    case 0:
                        //首先判断
                        if (parseInt(num / 10) <= GetScore("money",player.nameTag)) {
                            RunCmd(`scoreboard players add @a[name="${player.nameTag}"] oxygen ${num}`)
                            RunCmd(`scoreboard players add @a[name="${player.nameTag}"] money -${parseInt(num / 10)}`)
                            Tell(`§a>> 您使用 §l${parseInt(num / 10)} §r§a能源币，成功购买 §l${num} §r§a氧气值！`,player.nameTag)
                        } else {
                            Tell(`§c>> 购买失败！余额不足，您的余额为 ${GetScore("money",player.nameTag)} 能源币，而本次购买需要 ${parseInt(num / 10)} 能源币，您还缺少 ${parseInt(num / 10) - GetScore("money",player.nameTag)} 能源币，请在攒够足够货币后尝试再次购买！`,player.nameTag)
                        }
                        break;
                    case 1:
                        Tell(`§c>> 购买失败！原因是您取消了本次购买！`,player.nameTag)
                        break;
                }
            })

    },

    OxygenEqu(player){
        const OxygenEquForm = new ActionFormData()
            .title("升级呼吸装备")
            if (GetScore("equLevel",player.nameTag) == 17) {
                OxygenEquForm.body("§r§l===========================" + "\n§c您当前的呼吸装备已升到当前版本的最高级！" + "\n§r§l===========================")
                OxygenEquForm.button("§c返回上一级菜单")
            } else {
                OxygenEquForm.body("§r§l===========================" + "\n§r§e您的能源币余额为： §6§l" + GetScore("money",player.nameTag) + "\n§r§e您当前呼吸装备的等级： §l§6" + equLevelData[GetScore("equLevel",player.nameTag)].name + "\n§r§e您当前呼吸装备的最大氧气值： §l§6" + equLevelData[GetScore("equLevel",player.nameTag)].max + "\n§r§e您当前每分钟消耗的氧气值为： §l§6" + equLevelData[GetScore("equLevel",player.nameTag)].consume + "\n§r§l===========================" + "\n§r§e下一级升级所消耗的能源币： §l§6" + equLevelData[GetScore("equLevel",player.nameTag) + 1].price + "\n§r§e下一级呼吸装备的等级： §l§6" + equLevelData[GetScore("equLevel",player.nameTag) + 1].name + "\n§r§e下一级呼吸装备的最大氧气值： §l§6" + equLevelData[GetScore("equLevel",player.nameTag) + 1].max + "\n§r§e下一级每分钟消耗的氧气值为： §l§6" + equLevelData[GetScore("equLevel",player.nameTag) + 1].consume + "\n§r§l===========================")
                OxygenEquForm.button("§c返回上一级菜单")
                OxygenEquForm.button("§a升级至下一级呼吸装备")
            }
            OxygenEquForm.show(player).then(result => {
                if (result.selection == 0) {
                    this.OxygenMain(player)
                } else if (result.selection == 1) {
                    if (equLevelData[GetScore("equLevel",player.nameTag) + 1].price <= GetScore("money",player.nameTag)) {
                        RunCmd(`scoreboard players add @a[name="${player.nameTag}"] money -${equLevelData[GetScore("equLevel",player.nameTag) + 1].price}`)
                        Tell("§a>> 升级成功！您当前的氧气装备已经升级为 " + equLevelData[GetScore("equLevel",player.nameTag) + 1].name,player.nameTag)
                        RunCmd(`scoreboard players add @a[name="${player.nameTag}"] equLevel 1`)
                        this.OxygenEqu(player)
                    } else {
                        Tell("§c>> 升级失败！原因是余额不足！",player.nameTag)
                        this.OxygenEqu(player)
                    }
                }
            })
    },

    /////////////////////////////////////////////

    ActionBar(player) {
        const ActionBarForm = new ModalFormData()
        ActionBarForm.title("§c§l设置标题栏")
        if (player.hasTag("ShowActionbar")) {
            ActionBarForm.toggle("标题栏显示",true);
        } else {
            ActionBarForm.toggle("标题栏显示",false);
        }
        if (player.hasTag("ShowOxygenName")) {
            ActionBarForm.toggle("“氧气值”提示字样",true);
        } else {
            ActionBarForm.toggle("“氧气值”提示字样",false);
        }
        if (player.hasTag("ShowOxygen1")) {
            ActionBarForm.dropdown("氧气值显示方式",["不显示","样式1（进度条-百分比在内）","样式2（进度条-百分比在外）","样式3（数字显示）","样式4（纯百分比显示）"],1)
        } else if (player.hasTag("ShowOxygen2")) {
            ActionBarForm.dropdown("氧气值显示方式",["不显示","样式1（进度条-百分比在内）","样式2（进度条-百分比在外）","样式3（数字显示）","样式4（纯百分比显示）"],2)
        } else if (player.hasTag("ShowOxygen3")) {
            ActionBarForm.dropdown("氧气值显示方式",["不显示","样式1（进度条-百分比在内）","样式2（进度条-百分比在外）","样式3（数字显示）","样式4（纯百分比显示）"],3)
        } else if (player.hasTag("ShowOxygen4")) {
            ActionBarForm.dropdown("氧气值显示方式",["不显示","样式1（进度条-百分比在内）","样式2（进度条-百分比在外）","样式3（数字显示）","样式4（纯百分比显示）"],4)
        } else {
            ActionBarForm.dropdown("氧气值显示方式",["不显示","样式1（进度条-百分比在内）","样式2（进度条-百分比在外）","样式3（数字显示）","样式4（纯百分比显示）"],0)
        }
        if (player.hasTag("ShowMoney")) {
            ActionBarForm.dropdown("货币余额显示方式",["不显示","显示"],1)
        } else {
            ActionBarForm.dropdown("货币余额显示方式",["不显示","显示"],0)
        }
        if (player.hasTag("ShowTime")) {
            ActionBarForm.dropdown("在线时间显示方式",["不显示","显示"],1)
        } else {
            ActionBarForm.dropdown("在线时间显示方式",["不显示","显示"],0)
        }
        if (player.hasTag("ShowRN")) {
            ActionBarForm.dropdown("物价指数显示方式",["不显示","显示"],1)
        } else {
            ActionBarForm.dropdown("物价指数显示方式",["不显示","显示"],0)
        }
        //
        ActionBarForm.show(player).then((result) => {
            if (!result.canceled) {
                let Tags = ["ShowActionbar","ShowOxygenName","ShowOxygen1","ShowOxygen2","ShowOxygen3","ShowOxygen4","ShowMoney","ShowTime","ShowRN"]
                for (let i = 0; i < Tags.length; i++) {
                    RunCmd(`tag "${player.nameTag}" remove ${Tags[i]}`)
                }
                if (result.formValues[0] == 1) {
                    RunCmd(`tag "${player.nameTag}" add ShowActionbar`)
                }
                if (result.formValues[1] == 1) {
                    RunCmd(`tag "${player.nameTag}" add ShowOxygenName`)
                }
                if (result.formValues[2] >=1 && result.formValues[2] <=4) {
                    RunCmd(`tag "${player.nameTag}" add ShowOxygen${result.formValues[2]}`)
                }
                if (result.formValues[3] == 1) {
                    RunCmd(`tag "${player.nameTag}" add ShowMoney`)
                }
                if (result.formValues[4] == 1) {
                    RunCmd(`tag "${player.nameTag}" add ShowTime`)
                }
                if (result.formValues[5] == 1) {
                    RunCmd(`tag "${player.nameTag}" add ShowRN`)
                }
                Tell("§e>> 标题栏设置更改成功！",player.nameTag)
            }
        })
    }

}

//对于钟表使用的检测
world.events.beforeItemUse.subscribe(event => {
    // Tell(`§c>> ${event.item.typeId} ${event.source.nameTag}`,`NIANIANKNIA`);
    if (event.item.typeId == "minecraft:clock") {
        // Tell(`§c>> 你使用钟表!`,event.source.nameTag);
        let player = event.source;
        //调用服务器主菜单
        guiAPI.Main(player);
    }
})

//控制每时每刻执行的事件！
world.events.tick.subscribe(t => {
    RunCmd(`scoreboard players add @a oxygen 0`)
    RunCmd(`scoreboard players add @a equLevel 0`)
    RunCmd(`scoreboard players add @a actionbar 0`)
    RunCmd(`scoreboard players add @a time 0`)
    RunCmd(`scoreboard players add @a money 0`)
    RunCmd(`scoreboard players add @a AnoxicTime 0`)
    let players = world.getPlayers()
    let playerList = Array.from(players);
    //每秒钟执行的事件
    if (t.currentTick % 20 == 0) {
        let TIME = new Date();
        if (TIME.getMinutes() == 0 && TIME.getSeconds() == 0 ) {
            let RN = parseInt(Math.random() * 160) + 20
            RunCmd(`scoreboard players set RN DATA ${RN}`);
            RunCmd(`title @a title §c物价指数发生变动！`)
            RunCmd(`title @a subtitle §7物价指数由 §l§e${GetScore("DATA","RN") / 100} §r§7变为 §l§e${RN / 100}`)
        }
        if (TIME.getSeconds() == 0) {
            RunCmd(`scoreboard players add @a time 1`);
            for (let i = 0; i < playerList.length; i++) {
                RunCmd(`scoreboard players add @e[name="${playerList[i].nameTag}",type=player] oxygen -${equLevelData[GetScore("equLevel",playerList[i].nameTag)].consume}`);
            }
        }
        for (let i = 0; i < playerList.length; i++) {
            if (GetScore("oxygen",playerList[i].nameTag) <= 0) {
                RunCmd(`scoreboard players add @a[name="${playerList[i].name}"] AnoxicTime 1`)
            } else {
                RunCmd(`scoreboard players set @a[name="${playerList[i].name}"] AnoxicTime 0`)
            }
            if (GetScore("AnoxicTime",playerList[i].nameTag) == 1) {
                RunCmd(`title "${playerList[i].name}" title §c您已缺氧！`)
                RunCmd(`title "${playerList[i].name}" subtitle §7请及时补充氧气！`)
                Tell("§c>> 您已进入缺氧状态！请及时补充氧气，否则会导致死亡！5秒后系统将自动打开氧气购买界面！",playerList[i].nameTag)
            }
            if (GetScore("AnoxicTime",playerList[i].nameTag) == 6) {
                guiAPI.OxygenBuy(playerList[i])
            }
            if (GetScore("oxygen",playerList[i].nameTag) <= 200) {
                RunCmd(`effect "${playerList[i].name}" slowness 15 0`)
                RunCmd(`effect "${playerList[i].name}" weakness 15 2`)
            }
            if (GetScore("AnoxicTime",playerList[i].nameTag) >= 60) {
                RunCmd(`effect "${playerList[i].name}" blindness 15 0`)
                RunCmd(`effect "${playerList[i].name}" mining_fatigue 15 2`)
                RunCmd(`effect "${playerList[i].name}" nausea 15 0`)
            }
            //缺氧达到一定时间后直接进行死亡程序
            if (GetScore("AnoxicTime",playerList[i].nameTag) >= 240) {
                RunCmd(`kill "${playerList[i].name}"`)
                Tell("§c>> 我们很遗憾的通知您，由于您缺氧过长时间，昏倒在家中...幸亏您被巡逻机器人及时发现并送到了医院，才救回一条命...",playerList[i].nameTag)
                RunCmd(`scoreboard players set @a[name="${playerList[i].nameTag}"] oxygen 200`)
                RunCmd(`scoreboard players set @a[name="${playerList[i].name}"] AnoxicTime 0`)
                RunCmd(`scoreboard players add @a[name="${playerList[i].name}"] money -50`)
                Tell("§r======================\n§cNIA服务器医院 账单§r\n======================§c\n氧气费用 --- 20 能源币\n诊疗费用 --- 20 能源币\n转运费用 --- 10 能源币\n合计费用 --- 50 能源币§r\n======================",playerList[i].nameTag)
                Tell("§r===============================\n§cNIA服务器自动扣费通知§r\n===============================§c\n50 能源币 已自动从您账户扣除\n如果您发现账户余额为负请及时补齐\n否则可能影响您的信誉值！§r\n===============================",playerList[i].nameTag)
            }
        }
    }
    //这里控制标题栏显示
    let titleActionbar = "";
    for(let i = 0; i < playerList.length; i++) {
        //这里控制玩家氧气值不超过100%
        if (GetScore("oxygen",playerList[i].nameTag) > equLevelData[GetScore("equLevel",playerList[i].nameTag)].max) {
            RunCmd(`scoreboard players set @a[name="${playerList[i].nameTag}"] oxygen ${equLevelData[GetScore("equLevel",playerList[i].nameTag)].max}`)
        }
        //这里控制玩家氧气值不低于0
        if (GetScore("oxygen",playerList[i].nameTag) < 0) {
            RunCmd(`scoreboard players set @a[name="${playerList[i].nameTag}"] oxygen 0`)
        }
        //这里控制玩家标题栏
        if(playerList[i].hasTag("ShowActionbar")) {
            //
            if (playerList[i].hasTag("ShowOxygenName")) {
                titleActionbar = "氧气值："
            }
            //
            if (playerList[i].hasTag("ShowOxygen1") || playerList[i].hasTag("ShowOxygen2") || playerList[i].hasTag("ShowOxygen3") || playerList[i].hasTag("ShowOxygen4")) {
                let percent = (GetScore("oxygen",playerList[i].nameTag) / equLevelData[GetScore("equLevel",playerList[i].nameTag)].max)
                if (playerList[i].hasTag("ShowOxygen1")) {
                    switch (true) {
                        case percent >= 1:
                            titleActionbar = titleActionbar + "§e[§a||||||||||||||||||||§6100.00%§e]"
                            break;
                        case percent >= 0.95:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||||||||||§6${(percent * 100).toFixed(2)}%§7§e]`
                            break;
                        case percent >= 0.9:
                            titleActionbar = titleActionbar + `§e[§a||||||||||||||||||§6${(percent * 100).toFixed(2)}%§7|§e]`
                            break;
                        case percent >= 0.85:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||||||||§6${(percent * 100).toFixed(2)}%§7||§e]`
                            break;
                        case percent >= 0.8:
                            titleActionbar = titleActionbar + `§e[§a||||||||||||||||§6${(percent * 100).toFixed(2)}%§7|||§e]`
                            break;
                        case percent >= 0.75:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||||||§6${(percent * 100).toFixed(2)}%§7||||§e]`
                            break;
                        case percent >= 0.7:
                            titleActionbar = titleActionbar + `§e[§a||||||||||||||§6${(percent * 100).toFixed(2)}%§7|||||§e]`
                            break;
                        case percent >= 0.65:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||||§6${(percent * 100).toFixed(2)}%§7||||||§e]`
                            break;
                        case percent >= 0.6:
                            titleActionbar = titleActionbar + `§e[§a||||||||||||§6${(percent * 100).toFixed(2)}%§7|||||||§e]`
                            break;
                        case percent >= 0.55:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||§6${(percent * 100).toFixed(2)}%§7||||||||§e]`
                            break;
                        case percent >= 0.5:
                            titleActionbar = titleActionbar + `§e[§a||||||||||§6${(percent * 100).toFixed(2)}%§7|||||||||§e]`
                            break;
                        case percent >= 0.45:
                            titleActionbar = titleActionbar + `§e[§a|||||||||§6${(percent * 100).toFixed(2)}%§7||||||||||§e]`
                            break;
                        case percent >= 0.4:
                            titleActionbar = titleActionbar + `§e[§a||||||||§6${(percent * 100).toFixed(2)}%§7|||||||||||§e]`
                            break;
                        case percent >= 0.35:
                            titleActionbar = titleActionbar + `§e[§a|||||||§6${(percent * 100).toFixed(2)}%§7||||||||||||§e]`
                            break;
                        case percent >= 0.3:
                            titleActionbar = titleActionbar + `§e[§a||||||§6${(percent * 100).toFixed(2)}%§7|||||||||||||§e]`
                            break;
                        case percent >= 0.25:
                            titleActionbar = titleActionbar + `§e[§a|||||§6${(percent * 100).toFixed(2)}%§7||||||||||||||§e]`
                            break;
                        case percent >= 0.2:
                            titleActionbar = titleActionbar + `§e[§c||||§c${(percent * 100).toFixed(2)}%§7|||||||||||||||§e]`
                            break;
                        case percent >= 0.15:
                            titleActionbar = titleActionbar + `§e[§c|||§c${(percent * 100).toFixed(2)}%§7||||||||||||||||§e]`
                            break;
                        case percent >= 0.1:
                            titleActionbar = titleActionbar + `§e[§c||§c${(percent * 100).toFixed(2)}%§7|||||||||||||||||§e]`
                            break;
                        case percent >= 0.05:
                            titleActionbar = titleActionbar + `§e[§c|§c${(percent * 100).toFixed(2)}%§7||||||||||||||||||§e]`
                            break;
                        case percent >= 0:
                            titleActionbar = titleActionbar + `§e[§c${(percent * 100).toFixed(2)}%§7|||||||||||||||||||§e]`
                            break;
                        case percent < 0:
                            titleActionbar = titleActionbar + `§e[§c0.00%§7|||||||||||||||||||§e]`
                            break;
                    }
                } else if (playerList[i].hasTag("ShowOxygen2")) {
                    switch (true) {
                        case percent >= 1:
                            titleActionbar = titleActionbar + "§e[§a||||||||||||||||||||§e] §6100.00%"
                            break;
                        case percent >= 0.95:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||||||||||§6|§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.9:
                            titleActionbar = titleActionbar + `§e[§a||||||||||||||||||§6|§7|§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.85:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||||||||§6|§7||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.8:
                            titleActionbar = titleActionbar + `§e[§a||||||||||||||||§6|§7|||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.75:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||||||§6|§7||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.7:
                            titleActionbar = titleActionbar + `§e[§a||||||||||||||§6|§7|||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.65:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||||§6|§7||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.6:
                            titleActionbar = titleActionbar + `§e[§a||||||||||||§6|§7|||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.55:
                            titleActionbar = titleActionbar + `§e[§a|||||||||||§6|§7||||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.5:
                            titleActionbar = titleActionbar + `§e[§a||||||||||§6|§7|||||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.45:
                            titleActionbar = titleActionbar + `§e[§a|||||||||§6|§7||||||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.4:
                            titleActionbar = titleActionbar + `§e[§a||||||||§6|§7|||||||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.35:
                            titleActionbar = titleActionbar + `§e[§a|||||||§6|§7||||||||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.3:
                            titleActionbar = titleActionbar + `§e[§a||||||§6|§7|||||||||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.25:
                            titleActionbar = titleActionbar + `§e[§a|||||§6|§7||||||||||||||§e] §6${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.2:
                            titleActionbar = titleActionbar + `§e[§c||||§6|§7|||||||||||||||§e] §c${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.15:
                            titleActionbar = titleActionbar + `§e[§c|||§6|§7||||||||||||||||§e] §c${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.1:
                            titleActionbar = titleActionbar + `§e[§c||§6|§7|||||||||||||||||§e] §c${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0.05:
                            titleActionbar = titleActionbar + `§e[§c|§6|§7||||||||||||||||||§e] §c${(percent * 100).toFixed(2)}%`
                            break;
                        case percent >= 0:
                            titleActionbar = titleActionbar + `§e[§6|§7|||||||||||||||||||§e] §c${(percent * 100).toFixed(2)}%`
                            break;
                        case percent < 0:
                            titleActionbar = titleActionbar + `§e[§7||||||||||||||||||||§e] §c0.00%`
                            break;
                    }
                } else if (playerList[i].hasTag("ShowOxygen3")) {
                    titleActionbar = titleActionbar + `§l§e${GetScore("oxygen",playerList[i].nameTag)}/${equLevelData[GetScore("equLevel",playerList[i].nameTag)].max}`
                } else if (playerList[i].hasTag("ShowOxygen4")) {
                    titleActionbar = titleActionbar + `§l§e${(percent * 100).toFixed(2)}%`
                }
            }
            if (playerList[i].hasTag("ShowMoney")) {
                titleActionbar = titleActionbar + "§r §f能源币：§e§l" + GetScore("money",playerList[i].nameTag)
            }
            if (playerList[i].hasTag("ShowTime")) {
                titleActionbar = titleActionbar + "§r §f在线时间：§e§l" + GetScore("time",playerList[i].nameTag)
            }
            if (playerList[i].hasTag("ShowRN")) {
                titleActionbar = titleActionbar + "§r §f物价指数：§e§l" + GetScore("DATA","RN") / 100
            }
            if (GetScore("oxygen",playerList[i].nameTag) <= 200 && GetScore("oxygen",playerList[i].nameTag) > 0) {
                titleActionbar = titleActionbar + "§r\n§c§l您即将进入缺氧状态，请及时补充氧气！"
            }
            if (GetScore("AnoxicTime",playerList[i].nameTag) > 0) {
                titleActionbar = titleActionbar + "§r\n§c§l⚠警告！您已经进入缺氧状态 " + GetScore("AnoxicTime",playerList[i].nameTag) + " 秒，请及时补充氧气否则将会死亡！"
            }
            RunCmd(`title @a[name=${playerList[i].name}] actionbar ${titleActionbar}`)
        }
    }
})
