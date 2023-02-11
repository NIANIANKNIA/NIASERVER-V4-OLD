//LiteLoaderScript Dev Helper
/// <reference path="e:\服务器本地测试/dts/llaids/src/index.d.ts"/>

const PLUGIN_NAME = "NiaServerPlugin";
const PLUGIN_DESCRIPTION = "NIA服务器基础插件";
const VERSION = [1,0,0];
const AUTHOR = "NIANIANKNIA";

logger.setTitle(`${PLUGIN_NAME}`);
logger.setConsole(true, 4);
log("NiaServerPlugin--NIA服务器基础插件 加载成功！")

const homelist_path = './plugins/NiaServer/homelist.json';

if (!file.exists(homelist_path)) {
    log("首次运行，正在生成homelist文件");
    //初始化示例文件格式
    let a = {"Steve":{"test":{"x": 0, "y": 0, "z": 0,"dimid": 0}}};
    File.writeTo(homelist_path,JSON.stringify(a, null, 2));
}


mc.listen("onServerStarted",() => {
    //home 指令的注册
    let cmdhome = mc.newCommand("home", "设置你的家" ,PermType.Any);
        cmdhome.setEnum("AddAction", ["add"]);
        cmdhome.setEnum("GuiAction", ["gui"]);
        cmdhome.optional("action", ParamType.Enum, "AddAction", 1);
        cmdhome.mandatory("action", ParamType.Enum, "GuiAction", 1);
        cmdhome.optional("name", ParamType.RawText);
        cmdhome.overload(["GuiAction"]);
        cmdhome.overload(["AddAction", "name"]);
    //home 指令回传
    cmdhome.setCallback((cmdhome, origin, out, res) => {
        let homelist = JSON.parse(File.readFrom(homelist_path));//首先再次从homelist文件读取玩家home的数据
        switch (res.action) {
            //选择 GUI 项目之后打开相应的 GUI 菜单
            case "gui":
                let HomeMenu = mc.newSimpleForm();
                    HomeMenu.setTitle("个人传送点菜单");
                    HomeMenu.setContent("可以使用指令/home add 个人传送点的名字 指令来添加个人传送点\n§c注意：添加相同名字的传送点会顶替掉老的传送点，此操作不可逆！！！！");
                    HomeMenu.addButton("添加个人传送点");
                    HomeMenu.addButton("删除个人传送点");
                //在 homelist 这个对象中遍历，来提取相应玩家的数据
                for (let playerName in homelist) {
                    if (playerName == origin.player.realName) {
                        for (let i in homelist[playerName]) {
                            //let plposinfo = homelist[key];//未来版本home显示相应的传送点坐标以及维度显示
                            HomeMenu.addButton(i + "\n§c坐标：(" + Math.round(homelist[playerName][i].x) + ", " + Math.round(homelist[playerName][i].y) + ", " + Math.round(homelist[playerName][i].z) + ")");
                        }
                    }
                }
                origin.player.sendForm(HomeMenu, function (player, dates) {
                    if (dates == 0) {
                        let homeadd = mc.newCustomForm();
                            homeadd.setTitle("§a添加一个家！");
                            homeadd.addLabel("请为坐标为: (" + Math.round(player.pos.x) + "," + Math.round(player.pos.y) + "," + Math.round(player.pos.z) + ") 的个人传送点命名！");
                            homeadd.addInput("在下方填写个人传送点的名字", "...");
                            player.sendForm(homeadd, function (player, dates) {
                                homelist = JSON.parse(File.readFrom(homelist_path));
                                if (dates == null) {
                                    player.tell("§c>> 你取消了本次操作！")
                                } else {
                                    //player.runcmd("home add " + dates[1]);
                                    if (dates[1] == null) {
                                        player.tell("§c>> 个人传送点未命名，添加失败！");
                                    } else {
                                        homelist = JSON.parse(File.readFrom(homelist_path));
                                        let homeadd = {};
                                        let homepreadd = {};
                                        homeadd.x = player.pos.x
                                        homeadd.y = player.pos.y
                                        homeadd.z = player.pos.z
                                        homeadd.dimid = player.pos.dimid;
                                        homepreadd[dates[1]] = homeadd;
                                        let dp = dates[1];
                                        let dpdate = homepreadd;
                                        player.sendModalForm("个人传送点确认","你是否确定添加名为 " + dates[1] + " §f到个人传送点\n其中坐标为: (" + Math.round(homeadd.x) + " ," + Math.round(homeadd.y) + " ," + Math.round(homeadd.z) + ")  到个人传送点？","§a确认","§c取消",function(player, res) {
                                            if (res == true) {
                                                var plhomeres = true;
                                                for (let i in homelist) {
                                                    if (i == player.realName) {
                                                        homelist = JSON.parse(File.readFrom(homelist_path));
                                                        let a = homelist[i];
                                                        dpdate = {...a, ...dpdate};
                                                        homelist[player.realName] = dpdate;
                                                        File.writeTo(homelist_path,JSON.stringify(homelist, null, 2));
                                                        player.tell("§a>> " + dp + " §a已成功添加到个人传送点！")
                                                        plhomeres = false;
                                                        break;
                                                    }
                                                }
                                                if (plhomeres) {
                                                    homelist[player.realName] = dpdate;
                                                    File.writeTo(homelist_path,JSON.stringify(homelist, null, 2));
                                                    player.tell("§a>> " + dp + " §a已成功添加到个人传送点！");
                                                }
                                            } else if (res == false) {
                                                player.tell("§c>> " + dp + " §c未能成功添加到个人传送点！")
                                            }
                                        })
                                    }
                                }
                            })
                    } else if (dates == 1) {
                        let homeremove = mc.newSimpleForm();
                            homeremove.setTitle("§c删除个人传送点");
                            homeremove.setContent("§c注意：删除个人传送点操作不可逆，请谨慎操作！！！")
                            for (let playerName in homelist) {
                                if (playerName == player.realName) {
                                    for (let i in homelist[playerName]) {
                                        //let plposinfo = homelist[key];//未来版本home显示相应的传送点坐标以及维度显示
                                        homeremove.addButton(i + "\n§c坐标：(" + Math.round(homelist[playerName][i].x) + ", " + Math.round(homelist[playerName][i].y) + ", " + Math.round(homelist[playerName][i].z) + ")");
                                    }
                                }
                            }
                            player.sendForm(homeremove, function (player, id) {
                                for (let key in homelist) {
                                    if (key == player.realName) {
                                        let a = homelist[key];
                                        let num = 0;
                                        for(let k in a) {
                                            if (num == id) {
                                                let pos = a[k];
                                                let wd = "";
                                                if (pos.dimid == 0) {
                                                    wd = "主世界";
                                                } else if (pos.dimid == 1) {
                                                    wd = "下界";
                                                } else if (pos.dimid == 2) {
                                                    wd = "末地";
                                                }
                                                player.sendModalForm("§c删除传送点确认","§c你是否确定删除名字为 §e" + k + "§r §c的个人传送点？\n它的坐标为: (" + Math.round(pos.x) + "," + Math.round(pos.y) + "," + Math.round(pos.z) + ")\n该传送点所属维度为：" + wd + "\n请谨慎操作，该操作不可逆！！！","§c确认删除","§a取消删除",function(player, res) {
                                                    if (res == true) {
                                                        player.tell("§c>> 名字为 " + k + " §c的个人传送点已经删除，坐标为: (" + Math.round(pos.x) + "," + Math.round(pos.y) + "," + Math.round(pos.z) + ")，该传送点所属维度为：" + wd);
                                                        delete a[k];
                                                        homelist[player.realName] = a;
                                                        File.writeTo(homelist_path,JSON.stringify(homelist, null, 2));
                                                    } else if (res == false) {
                                                        player.tell("§c>> 名字为 " + k + " §c的个人传送点未能成功删除。");
                                                    }
                                                })
                                            }
                                            num++;
                                        }
                                    }
                                }
                            })
                    }
                    for (let key in homelist) {
                        if (key == player.realName) {
                            let a = homelist[key];
                            let num = 0;
                            for(let k in a) {
                                if ((num + 2) == dates) {
                                    let pos = a[k];
                                    player.teleport(pos.x,pos.y,pos.z,pos.dimid);
                                    player.tell("§a>> 已经将你传送到个人传送点: " + k);
                                }
                                num++;
                            }
                        }
                    }
                })
                break;
            case "add":
                if (res.name == null) {
                    origin.player.tell("§c>> 个人传送点未命名，添加失败！");
                    break;
                } else {
                    homelist = JSON.parse(File.readFrom(homelist_path));
                    let homeadd = {};
                    let homepreadd = {};
                    homeadd.x = origin.pos.x
                    homeadd.y = origin.pos.y
                    homeadd.z = origin.pos.z
                    homeadd.dimid = origin.pos.dimid;
                    homepreadd[res.name] = homeadd;
                    let dp = res.name;
                    let dpdate = homepreadd;
                    origin.player.sendModalForm("个人传送点确认","你是否确定添加名为 " + res.name + " §f到个人传送点\n其中坐标为: (" + Math.round(homeadd.x) + " ," + Math.round(homeadd.y) + " ," + Math.round(homeadd.z) + ")  到个人传送点？","§a确认","§c取消",function(player, res) {
                        if (res == true) {
                            var plhomeres = true;
                            for (let i in homelist) {
                                if (i == player.realName) {
                                    homelist = JSON.parse(File.readFrom(homelist_path));
                                    let a = homelist[i];
                                    dpdate = {...a, ...dpdate};
                                    homelist[player.realName] = dpdate;
                                    File.writeTo(homelist_path,JSON.stringify(homelist, null, 2));
                                    player.tell("§a>> " + dp + " §a已成功添加到个人传送点！")
                                    plhomeres = false;
                                    break;
                                }
                            }
                            if (plhomeres) {
                                homelist[player.realName] = dpdate;
                                File.writeTo(homelist_path,JSON.stringify(homelist, null, 2));
                                player.tell("§a>> " + dp + " §a已成功添加到个人传送点！");
                            }
                        } else if (res == false) {
                            player.tell("§c>> " + dp + " §c未能成功添加到个人传送点！")
                        }
                    })
                }
        }
    });
    cmdhome.setup();

    let cmdOpenHomeGUI = mc.newCommand("openhomegui","对特定玩家打开homegui",PermType.GameMasters)
    cmdOpenHomeGUI.optional("playername",ParamType.RawText)
    cmdOpenHomeGUI.overload(["playername"])
    cmdOpenHomeGUI.setCallback((cmdOpenHomeGUI,origin,out,res) => {
        let player = mc.getPlayer(res.playername)
        if (player) {
            let homelist = JSON.parse(File.readFrom(homelist_path));
            let HomeMenu = mc.newSimpleForm();
                HomeMenu.setTitle("个人传送点菜单");
                HomeMenu.setContent("可以使用指令/home add 个人传送点的名字 指令来添加个人传送点\n§c注意：添加相同名字的传送点会顶替掉老的传送点，此操作不可逆！！！！");
                HomeMenu.addButton("添加个人传送点");
                HomeMenu.addButton("删除个人传送点");
            //在 homelist 这个对象中遍历，来提取相应玩家的数据
            for (let playerName in homelist) {
                if (playerName == player.realName) {
                    for (let i in homelist[playerName]) {
                        //let plposinfo = homelist[key];//未来版本home显示相应的传送点坐标以及维度显示
                        HomeMenu.addButton(i + "\n§c坐标：(" + Math.round(homelist[playerName][i].x) + ", " + Math.round(homelist[playerName][i].y) + ", " + Math.round(homelist[playerName][i].z) + ")");
                    }
                }
            }
            player.sendForm(HomeMenu, function (player, dates) {
                homelist = JSON.parse(File.readFrom(homelist_path));
                if (dates == 0) {
                    let homeadd = mc.newCustomForm();
                        homeadd.setTitle("§a添加一个家！");
                        homeadd.addLabel("请为坐标为: (" + Math.round(player.pos.x) + "," + Math.round(player.pos.y) + "," + Math.round(player.pos.z) + ") 的个人传送点命名！");
                        homeadd.addInput("在下方填写个人传送点的名字", "...");
                        player.sendForm(homeadd, function (player, dates) {
                            if (dates == null) {
                                player.tell("§c>> 你取消了本次操作！")
                            } else {
                                //player.runcmd("home add " + dates[1]);
                                if (dates[1] == null) {
                                    player.tell("§c>> 个人传送点未命名，添加失败！");
                                } else {
                                    homelist = JSON.parse(File.readFrom(homelist_path));
                                    let homeadd = {};
                                    let homepreadd = {};
                                    homeadd.x = player.pos.x
                                    homeadd.y = player.pos.y
                                    homeadd.z = player.pos.z
                                    homeadd.dimid = player.pos.dimid;
                                    homepreadd[dates[1]] = homeadd;
                                    let dp = dates[1];
                                    let dpdate = homepreadd;
                                    player.sendModalForm("个人传送点确认","你是否确定添加名为 " + dates[1] + " §f到个人传送点\n其中坐标为: (" + Math.round(homeadd.x) + " ," + Math.round(homeadd.y) + " ," + Math.round(homeadd.z) + ")  到个人传送点？","§a确认","§c取消",function(player, res) {
                                        if (res == true) {
                                            var plhomeres = true;
                                            for (let i in homelist) {
                                                if (i == player.realName) {
                                                    homelist = JSON.parse(File.readFrom(homelist_path));
                                                    let a = homelist[i];
                                                    dpdate = {...a, ...dpdate};
                                                    homelist[player.realName] = dpdate;
                                                    File.writeTo(homelist_path,JSON.stringify(homelist, null, 2));
                                                    player.tell("§a>> " + dp + " §a已成功添加到个人传送点！")
                                                    plhomeres = false;
                                                    break;
                                                }
                                            }
                                            if (plhomeres) {
                                                homelist[player.realName] = dpdate;
                                                File.writeTo(homelist_path,JSON.stringify(homelist, null, 2));
                                                player.tell("§a>> " + dp + " §a已成功添加到个人传送点！");
                                            }
                                        } else if (res == false) {
                                            player.tell("§c>> " + dp + " §c未能成功添加到个人传送点！")
                                        }
                                    })
                                }
                            }
                        })
                } else if (dates == 1) {
                    let homeremove = mc.newSimpleForm();
                        homeremove.setTitle("§c删除个人传送点");
                        homeremove.setContent("§c注意：删除个人传送点操作不可逆，请谨慎操作！！！")
                        for (let playerName in homelist) {
                            if (playerName == player.realName) {
                                for (let i in homelist[playerName]) {
                                    //let plposinfo = homelist[key];//未来版本home显示相应的传送点坐标以及维度显示
                                    homeremove.addButton(i + "\n§c坐标：(" + Math.round(homelist[playerName][i].x) + ", " + Math.round(homelist[playerName][i].y) + ", " + Math.round(homelist[playerName][i].z) + ")");
                                }
                            }
                        }
                        player.sendForm(homeremove, function (player, id) {
                            for (let key in homelist) {
                                if (key == player.realName) {
                                    let a = homelist[key];
                                    let num = 0;
                                    for(let k in a) {
                                        if (num == id) {
                                            let pos = a[k];
                                            let wd = "";
                                            if (pos.dimid == 0) {
                                                wd = "主世界";
                                            } else if (pos.dimid == 1) {
                                                wd = "下界";
                                            } else if (pos.dimid == 2) {
                                                wd = "末地";
                                            }
                                            player.sendModalForm("§c删除传送点确认","§c你是否确定删除名字为 §e" + k + "§r §c的个人传送点？\n它的坐标为: (" + Math.round(pos.x) + "," + Math.round(pos.y) + "," + Math.round(pos.z) + ")\n该传送点所属维度为：" + wd + "\n请谨慎操作，该操作不可逆！！！","§c确认删除","§a取消删除",function(player, res) {
                                                if (res == true) {
                                                    player.tell("§c>> 名字为 " + k + " §c的个人传送点已经删除，坐标为: (" + Math.round(pos.x) + "," + Math.round(pos.y) + "," + Math.round(pos.z) + ")，该传送点所属维度为：" + wd);
                                                    delete a[k];
                                                    homelist[player.realName] = a;
                                                    File.writeTo(homelist_path,JSON.stringify(homelist, null, 2));
                                                } else if (res == false) {
                                                    player.tell("§c>> 名字为 " + k + " §c的个人传送点未能成功删除。");
                                                }
                                            })
                                        }
                                        num++;
                                    }
                                }
                            }
                        })
                }
                for (let key in homelist) {
                    if (key == player.realName) {
                        let a = homelist[key];
                        let num = 0;
                        for(let k in a) {
                            if ((num + 2) == dates) {
                                let pos = a[k];
                                player.teleport(pos.x,pos.y,pos.z,pos.dimid);
                                player.tell("§a>> 已经将你传送到个人传送点: " + k);
                            }
                            num++;
                        }
                    }
                }
            })
        }
    })
    cmdOpenHomeGUI.setup()
})


