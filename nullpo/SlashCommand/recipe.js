const nplogger = require("../log/logger");
const { Client, GatewayIntentBits, SlashCommandBuilder } = require("discord.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
const admin_command_notification = client.channels.cache.get('1038810354853085245');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('recipe')
        .setDescription('lifeのレシピを参照します。')
        .addStringOption(option =>
            option.setName('item_name')
            .setDescription('レシピを参照したいアイテム名を入力・選択してください。')
            .addChoices(
                {name:"ミスリルインゴット", value:"mithril"},
                {name:"鋼鉄インゴット", value:"steel"},
                {name:"強化黒曜石", value:"reinforced_obsidian"},
                {name:"$成金ブロック$", value:"narikin"},
                {name:"複合鉱石の塊", value:"complex_ore"},
                {name:"― 赤熟した複合鉱石の塊 ―", value:"ripe_red_complex_ore"},
                {name:"超強力冷却剤", value:"super_strong_coolant"},
                {name:"ΟριχαρόνIngot(オリハルコン)", value:"orichalcum"},
                {name:"青き魔力の源", value:"blue_magical_power"},
                {name:"赤き燃力の源", value:"red_burning_power"},
                {name:"マジカトロン結晶", value:"majicatron_crystal"},
                {name:"水バケツ圧縮チケット", value:"water_ticket"},
                {name:"海洋の心", value:"ocean_heart"},
                {name:"スポンジ", value:"sponge"},
                {name:"超合金ドリルクァーリー", value:"super_duranium_drill"},
                {name:"超合金ドリルクァーリー(強化)", value:"super_duranium_drill_upgrade"},
                {name:"ヘルメスの斧", value:"axe_of_helmes"},
                {name:"アイスソード(極含む)", value:"ice_sword"},
                {name:"キュアステッキ", value:"cure_stick"},
                {name:"Godlyマナロッド", value:"godly_mana_rod"},
            )
        .setRequired(true)),
async execute(interaction) {
    logger.trace("[SlashCommand] recipe.js");
    nplogger("command");
    const type = interaction.options.getString('item_name');
    switch(type){
        case 'mithril':
            interaction.reply({ 
                content: "ミスリルインゴット\n必要素材:圧縮ダイヤブロック×4、圧縮鉄ブロック×2、鋼鉄インゴット×2、ネザースター×1",
                files:['./nullpo/components/recipe/picture/mithril.png','./nullpo/components/recipe/picture/res_mithril.png'], 
                ephemeral: true
            });
            break;
        case 'steel':
            interaction.reply({ 
                content: "鋼鉄インゴット\n必要素材:圧縮鉄ブロックx8、圧縮石炭ブロックx1",
                files:['./nullpo/components/recipe/picture/steel.png','./nullpo/components/recipe/picture/res_steel.png'], 
                ephemeral: true
            });
            break;
        case 'reinforced_obsidian':
            interaction.reply({ 
                content: "強化黒曜石\n必要素材:黒曜石x8、ダイヤモンドx1",
                files:['./nullpo/components/recipe/picture/reinforced_obsidian.png','./nullpo/components/recipe/picture/res_reinforced_obsidian.png'], 
                ephemeral: true
            });
            break;
        case 'narikin':
            interaction.reply({ 
                content: "$成金ブロック$\n必要素材:圧縮金ブロックx9",
                files:['./nullpo/components/recipe/picture/narikin.png','./nullpo/components/recipe/picture/res_narikin.png'], 
                ephemeral: true
            });
            break;
        case 'complex_ore':
            interaction.reply({ 
                content: "複合鉱石の塊\n必要素材:$成金ブロック$x6、ミスリルインゴットx3",
                files:['./nullpo/components/recipe/picture/complex_ore.png','./nullpo/components/recipe/picture/res_complex_ore.png'], 
                ephemeral: true
            });
            break;
        case 'ripe_red_complex_ore':
            interaction.reply({ 
                content: "― 赤熟した複合鉱石の塊 ―\n必要素材:圧縮石炭ブロックx8、複合鉱石の塊x1",
                files:['./nullpo/components/recipe/picture/ripe_red_complex_ore.png','./nullpo/components/recipe/picture/res_ripe_red_complex_ore.png'], 
                ephemeral: true
            });
            break;
        case 'super_strong_coolant':
            interaction.reply({ 
                content: "超強力冷却剤x2\n必要素材:水バケツ圧縮チケットx5、青氷x3、海洋の心x1",
                files:['./nullpo/components/recipe/picture/super_strong_coolant.png','./nullpo/components/recipe/picture/res_super_strong_coolant.png'], 
                ephemeral: true
            });
            break;
        case 'orichalcum':
            interaction.reply({ 
                content: "ΟριχαρόνIngot\n必要素材:― 赤熟した複合鉱石 ―x1、超強力冷却剤x1",
                files:['./nullpo/components/recipe/picture/orichalcum.png','./nullpo/components/recipe/picture/res_orichalcum.png'], 
                ephemeral: true
            });
            break;
        case 'blue_magical_power':
            interaction.reply({ 
                content: "青き魔力の源\n必要素材:圧縮ラピスブロックx9",
                files:['./nullpo/components/recipe/picture/blue_magical_power.png','./nullpo/components/recipe/picture/res_blue_magical_power.png'], 
                ephemeral: true
            });
            break;
        case 'red_burning_power':
            interaction.reply({ 
                content: "赤き燃力の源\n必要素材:圧縮レッドストーンブロックx9",
                files:['./nullpo/components/recipe/picture/red_burning_power.png','./nullpo/components/recipe/picture/res_red_burning_power.png'], 
                ephemeral: true
            });
            break;
        case 'majicatron_crystal':
            interaction.reply({ 
                content: "マジカトロン結晶\n必要素材:赤き燃力の源x256、青き魔力の源x256、ネザースターx16",
                files:['./nullpo/components/recipe/picture/majicatron_crystal.png','./nullpo/components/recipe/picture/res_majicatron_crystal.png'], 
                ephemeral: true
            });
            break;
        case 'water_ticket':
            interaction.reply({ 
                content: "水バケツ圧縮チケット\n必要素材:水バケツx1(バケツは返ってくる)",
                files:['./nullpo/components/recipe/picture/water_ticket.png','./nullpo/components/recipe/picture/res_water_ticket.png'], 
                ephemeral: true
            });
            break;
        case 'ocean_heart':
            interaction.reply({ 
                content: "海洋の心\n必要素材:水バケツ圧縮チケットx4、釣りチケットプラスx2、釣りチケットx2、ネザースターx1\n↓配置↓\n釣りチケ+・水チケ・釣りチケ\n水チケ・ネザースター・水チケ\n釣りチケ・水チケ・釣りチケ+",
                files:['./nullpo/components/recipe/picture/ocean_heart.png','./nullpo/components/recipe/picture/res_ocean_heart.png'], 
                ephemeral: true
            });
            break;
        case 'sponge':
            interaction.reply({ 
                content: "スポンジ\n必要素材:黄色の染料x4、砂x2、砂利x2、干草の俵x1",
                files:['./nullpo/components/recipe/picture/sponge.png','./nullpo/components/recipe/picture/res_sponge.png'], 
                ephemeral: true
            });
            break;
        case 'super_duranium_drill':
            interaction.reply({ 
                content: "超合金ドリルクァーリー\n必要素材:鉄隕石の欠片x64、超合金メイプルx8\n性能:効率強化20、修繕、耐久力10",
                files:['./nullpo/components/recipe/picture/super_duranium_drill.png','./nullpo/components/recipe/picture/res_super_duranium_drill.png'], 
                ephemeral: true
            });
            break;
        case 'super_duranium_drill_upgrade':
            interaction.reply({ 
                content: "超合金ドリルクァーリー(強化レシピ)\n必要素材:超合金ドリルクァーリーx1、研磨剤(II～X)x2、彗星の欠片x4、ルチルプラチナx4\n性能:効率強化20、修繕、耐久力(20～100)\n研磨剤はII、III...と必要となる",
                files:['./nullpo/components/recipe/picture/super_duranium_drill.png','./nullpo/components/recipe/picture/res_super_duranium_drill_upgrade.png'], 
                ephemeral: true
            });
            break;
        case 'axe_of_helmes':
            interaction.reply({ 
                content: "ヘルメスの斧\n必要素材:資源アックスx1、資源カスタムチケットA,B,C,Dx各32\n性能:効率強化8、修繕、幸運orシルクタッチ(資源アックスと同一)、耐久力20",
                files:['./nullpo/components/recipe/picture/axe_of_helmes.png','./nullpo/components/recipe/picture/res_axe_of_helmes.png'], 
                ephemeral: true
            });
            break;
        case 'ice_sword':
            interaction.reply({ 
                content: "アイスソード極\n必要素材:霊氷x4032(63st)、投票チケットx1008(15st+48)、オンタイムチケットx128(2st)\n個別素材:凍結チケット=霊氷x32、投票チケx8  アイスソード=凍結チケx30、圧縮OTTlv1x64\n凍剣ブリザード=アイスソード、凍結チケx32  アイスソード極=凍剣ブリザード、凍結チケx64\n作成場所:上級取引所のうさぎ\n詳細: https://tinyurl.com/2jbu37rt",
                files:['./nullpo/components/recipe/picture/ice_sword.png','./nullpo/components/recipe/picture/res_ice_sword.png'], 
                ephemeral: true
            });
            break;
        case 'cure_stick':
            interaction.reply({ 
                content: "キュアステッキ\n必要素材:弱化、鈍化、毒、負傷、治癒、再生、暗視、力のスプラッシュポーションx各1\n作成場所:激ムズ・闇森側の右から2番目の村人\n",
                files:['./nullpo/components/recipe/picture/cure_stick.png','./nullpo/components/recipe/picture/res_cure_stick.png'], 
                ephemeral: true
            });
            break;
        case 'godly_mana_rod':
            interaction.reply({
                content: "Godlyマナロッド\n必要素材:遥か夢の機材x32、研磨剤1x16384(256st)、黒魔鉄鉱x1024(16st)、FF小判x4096(64st)、マテラカイトx512(8st)、賢者の輝石x512(8st)、上質な原木x2048(32st)、鉄インゴットx8192(128st)\n作成場所:マナロッドG1～G3、漆黒剣、漆黒晶…FFSHOP\n儚き夢の器、Godlyマナロッド…FFSHOP裏のウィザスケ\n研磨剤X…クラフトor焚き火交換所",
                files:['./nullpo/components/recipe/picture/godly_mana_rod.png','./nullpo/components/recipe/picture/res_godly_mana_rod.png'],
                ephemeral: true
            });
            break;
        default:
            interaction.reply({
                    content: "定義されていないレシピが選択されました。管理者に通知されましたので、修正までお待ちください。",
                    ephemeral: true
            });
            admin_command_notification.send("<@&1033500115618513016> recipeコマンドで定義されていないレシピが選択されました。レシピID: " + type);
            break;
        }
        },
};