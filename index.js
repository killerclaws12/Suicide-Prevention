/*

HEY! IF you're reading this, you clearly know how to code. Come help us! Join our discord: https://discord.gg/YHvfUqVgWS

MMMMMMMMMMMMMMMMMWNKK000KXNWMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMMWKxo:;,''''',:ldONWMMMMMMMMMMMMM
MMMMMMMMMMMXkc'.            ..;o0WMMMMMMMMMMM
MMMMMMMMMNk;.                  ..lKWMMMMMMMMM
MMMMMMMMXo.      ...........     .,kWMMMMMMMM
MMMMMMMXl.   ..;lxO0KKKKK0Oxl;..   'xWMMMMMMM
MMMMMMWd.   .c0NMMMMMMMMMMMMMNx.    ,OWMMMMMM
MMMMMMK;    .lXMMMMMMMMMMMMMMXl.    .cXMMMMMM
MMMMMMk.     .oNMMMMMMMMMMMMNo.      ,0MMMMMM
MMMMMWx.      .dNMMMMMMMMMMNo.       ,0MMMMMM
MMMMMM0;       .oXMMMMMMMMXl.       .cXMMMMMM
MMMMMMWd.       .:0WMMMMWO;.        'kWMMMMMM
MMMMMMMXo.       .'dXMMNx'.        .oNMMMMMMM
MMMMMMMMXo.        .;dxc.         .oXMMMMMMMM
MMMMMMMMMNd.         ...        .'dNMMMMMMMMM
MMMMMMMMMMWk,.        .        .,kWMMMMMMMMMM
MMMMMMMMMMMW0c.               .:0WMMMMMMMMMMM
MMMMMMMMMMMMMXd'.            .oXMMMMMMMMMMMMM
MMMMMMMMMMMMMMWk'.           .dNMMMMMMMMMMMMM
MMMMMMMMMMMMMMNd.             .lXMMMMMMMMMMMM
MMMMMMMMMMMMMNd.               .:0WMMMMMMMMMM
MMMMMMMMMMMMNo.                 .,kWMMMMMMMMM
MMMMMMMMMMMNo.                   .'dNMMMMMMMM
MMMMMMMMMMNo.        ...'.         .oNMMMMMMM
MMMMMMMMMNo.         'ckKo.         .oNMMMMMM
MMMMMMMMWx.        .'kNWMNd'.        .oNMMMMM
MMMMMMMMK;         'kWMMMMWk,.       .lXMMMMM
MMMMMMMMNx,.      'kWMMMMMMW0;.     .oXMMMMMM
MMMMMMMMMWKc.   .'kWMMMMMMMMMKc.  .'xNMMMMMMM
MMMMMMMMMMMNk,..'kWMMMMMMMMMMMXo..:0WMMMMMMMM
MMMMMMMMMMMMWKl;kWMMMMMMMMMMMMMNkdXMMMMMMMMMM
MMMMMMMMMMMMMMNXWMMMMMMMMMMMMMMMMWMMMMMMMMMMM

*/









//required libraries and files
//Error handler
process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {

    console.error(err, 'Uncaught Exception caught');
  });

const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.DIRECT_MESSAGES] });
const { prefix, token, triggers, insults, langlist, langinfo, botPerms } = require('./config.json');
const Database = require('simplest.db');
const unleet = import("@cityssm/unleet");
const db = new Database({
  path: './data.json'
});
let lastMessage = null;
//Ready bot client ;)
client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`); //let us know we're good to go
  setInterval(() => {
    client.user.setActivity(`chat for suicide. discord.gg/kcEG3QXDDm - ${client.guilds.cache.size} servers/${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} users`, { type: 'LISTENING' }); //On init, add status
  }, 15000); //Update every 15 sec
});

client.on('messageCreate', async message => { //Message event listener
  lastMessage = message;
  if (message.author.bot || message.channel.type === 'DM' || !message.channel.permissionsFor(client.user).has(botPerms)) return;
  let lang = "en";
  if (db.get(`lang_${message.guild.id}`)) lang = db.get(`lang_${message.guild.id}`);
  let LCM = message.content.toLowerCase(); //Lower Case Message text
  const { suicidetitle, suicideauthor, suicidedescription, suicidefield1heading, suicidefield1, suicidefield2heading, suicidefield2, suicidefield3heading, suicidefield3, suicidefield4heading, suicidefield4, suicidefield5heading, suicidefield5, suicidefield6heading, suicidefield6, suicidefield7heading, suicidefield7, suicidefield8heading, suicidefield8, suicidefooter, insulttitle, insultauthor, insultdescription, dmembedtitle, dmembedauthor, dmembeddescription, dmembedfield1heading, dmembedfield1, dmembedfield2heading, dmembedfield2, dmembedfield3heading, dmembedfield3, dmembedfield4heading, dmembedfield4, dmembedfield5heading, dmembedfield5, dmembedfield6heading, dmembedfield6, dmembedfield7heading, dmembedfield7, dmembedfield8heading, dmembedfield8, dmembedfooter, infotitle, infoauthor, infodescription, infofield1heading, infofield1, infofield2heading, infofield2, infofield3heading, infofield3, infofield4heading, infofield4, infofooter, helpcommands, helplinks, helpauthor, helptitle, helpfield1heading, helpfield2heading, helpfield3heading, helpfield3, invitetitle, invitedescription, langstitle, langsauthor, langsfield1heading, langsfield1, bot2, bot3, bot4, wsping, rtping, pinging, addtoserver, nolang, langsus, mute2, mute3, dmmute2, dmmute3, dmmute4, dmmute5, mention, mention1, sent, seterror, } = require(`./lang/${lang}.json`);

  var possible_LCMs = (await unleet).default(LCM); // Returns an array of possible unl33ted messages (some l33tcodes may have different meanings)

  //Mention bot will activate aleart message without triggers
  if (message.mentions.users.first() === client.user) {
    const suicide = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(`${suicidetitle}`)
      .setAuthor(`${suicideauthor}`)
      .setDescription(`${suicidedescription}`)
      .addField(`${suicidefield1heading}`, `${suicidefield1}`, false)
      .addField(`${suicidefield2heading}`, `${suicidefield2}`, true)
      .addField(`${suicidefield3heading}`, `${suicidefield3}`, true)
      .addField(`${suicidefield4heading}`, `${suicidefield4}`, true)
      .addField(`${suicidefield5heading}`, `${suicidefield5}`, true)
      .addField(`${suicidefield6heading}`, `${suicidefield6}`, true)
      .addField(`${suicidefield7heading}`, `${suicidefield7}`, true)
      .addField(`${suicidefield8heading}`, `${suicidefield8}`, false)
      .setFooter(`${suicidefooter}`)

    message.channel.send({ embeds: [suicide] });
  }

  if (db.get(`mute_${message.author.id}`) == null) { //Check to see if you muted the bot (User side only)
    const commonElements = [];
    const parsedTriggers = triggers.map(x => x.replace(/\|/g, " *"));
    parsedTriggers.forEach(trigger => { // Loop ever each trigger and check if they match the message
      possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with trigger
        if (new RegExp(trigger, "g").test(unleeted_LCM)) {
          commonElements.push(true)
        }
      });
    })
    if (commonElements.length > 0) {
      const suicide = new MessageEmbed()
        .setColor('#04d384')
        .setTitle(`${suicidetitle}`)
        .setAuthor(`${suicideauthor}`)
        .setDescription(`${suicidedescription}`)
        .addField(`${suicidefield1heading}`, `${suicidefield1}`, false)
        .addField(`${suicidefield2heading}`, `${suicidefield2}`, true)
        .addField(`${suicidefield3heading}`, `${suicidefield3}`, true)
        .addField(`${suicidefield4heading}`, `${suicidefield4}`, true)
        .addField(`${suicidefield5heading}`, `${suicidefield5}`, true)
        .addField(`${suicidefield6heading}`, `${suicidefield6}`, true)
        .addField(`${suicidefield7heading}`, `${suicidefield7}`, true)
        .addField(`${suicidefield8heading}`, `${suicidefield8}`, false)
        .setFooter(`${suicidefooter}`)
      return message.author.send({ embeds: [suicide] }).catch(e => { message.channel.send(suicide) });

    }
    let args = LCM.trim().split(/ +/);
    args = args.map(x => x.replace(/\t/g, ""))
    if (commonElements.length < 1) {
      const parsedInsultTriggers = insults.map(x => x.replace(/\|/g, " *"));
      //console.log(parsedTriggers)
      parsedInsultTriggers.forEach(trigger => { // Loop ever each insult and check if they match the message
        possible_LCMs.forEach(unleeted_LCM => { // Loop over every possible unleeted message to match with insult
          if (new RegExp(trigger, "g").test(unleeted_LCM)) {
            commonElements.push(true)
          }
        });
      })
      if (commonElements.length > 0) {
        const insult = new MessageEmbed()
          .setColor('#04d384')
          .setTitle(`${insulttitle}`)
          .setAuthor(`${insultauthor}`)
          .setDescription(`${insultdescription}`)
        message.channel.send({ embeds: [insult] }).catch(console.err)
      }
    }
  } 





  //----------BEGIN COMMANDS AREA----------
  //Ping command
  const loading = client.emojis.cache.get("838616104687108117");
  if (LCM === '(ping' || LCM === ')ping' || LCM === '\\ping' || LCM === '~ping' || LCM === '|ping' || LCM === '!ping' || LCM === '?ping' || LCM === '.ping' || message.content === '$ping' || LCM === '%ping' || LCM === '-ping' || LCM === '--ping' || LCM === '=ping' || LCM === '+ping' || LCM === '_ping' || LCM === '/ping' || LCM === '&ping' || LCM === '--ping' || LCM === "`ping" || LCM === 'sp!ping') {
    message.channel.send(`${loading} Pinging...`).then((msg) => {
      msg.edit("\u200B");
      const ping = new MessageEmbed()
        .setColor('#04d384')
        .setTitle('Here is my ping young one')
        .setDescription(`Roundtrip latency is ${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms \nAPI Latency is ${Math.round(client.ws.ping)}ms`)
      msg.edit({ embeds: [ping] });
    });
    return;
  }

  //Command handler: Return if not prefixed
  if (!LCM.startsWith(prefix)) return;
  const arguments = LCM.slice(prefix.length).trim().split(' ');
  const command = arguments.shift().toLowerCase();

  //Bot info command
  if (['bot'].includes(command) || ['neofetch'].includes(command) || ['v'].includes(command)) {

    const os = require('os');
    const core = os.cpus()[0];
    const { version: djsversion } = require("discord.js");
    const { version } = require('./config.json');
    const bot = new MessageEmbed() //No need to be translated!
      .setColor('#04d384')
      .setFooter(bot2)
      .addFields(
        {name: `**❯ ${bot3}** ${client.user.tag} (${client.user.id})`,value: `**❯ ${bot4}** ${client.guilds.cache.size.toLocaleString()} `},
      )
      .addFields(
        {name: `❯ ${Math.floor(client.uptime / 86400000)}d ${Math.floor(client.uptime / 3600000) % 24}hr ${Math.floor(client.uptime / 60000) % 60}min ${Math.floor(client.uptime / 1000) % 60}sec`,value: '\u200b'},
        {name: `❯ ${os.platform()},${os.release()}`,value: '\u200b'},
        {name: `❯ ${core.model}`,value: `${os.cpus().length} x ${core.speed}MHz`},
        {name: `❯ ${Math.floor(((os.freemem()) / 10000000)) / 100}GiB/${Math.floor(((os.totalmem()) / 10000000)) / 100}GiB`,value: '\u200b'},
        {name: `**❯ Bot:**`,value: `Node.js: ${process.version} - Discord.js: v${djsversion} - v${version}`},
      )
      .setTimestamp();
    message.channel.send({ embeds: [bot] });

    //Info command
  } else if (['info'].includes(command) || ['bilgi'].includes(command)) {
    const info = new MessageEmbed()
      .setColor('#04d384')
      .setAuthor(infoauthor)
      .setTitle(infotitle)
      .setURL('https://discord.gg/mF3xQE69QP')
      .addField(infofield1heading, infofield1)
      .addField(infofield2heading, infofield2)
      .addField(infofield3heading, infofield3)
      .addField(infofield4heading, infofield4)
      .setFooter(infofooter)
    message.channel.send({ embeds: [info] });


    //Help command
  } else if (['help'].includes(command) || ['yardım'].includes(command)) {
    const help = new MessageEmbed()
      .setColor('#04d384')
      .setAuthor(helpauthor)
      .setTitle(helptitle)
      .setURL('https://discord.gg/mF3xQE69QP')
      .addField(helpfield1heading, helpcommands)
      .addField(helpfield2heading, helplinks)
      .addField(helpfield3heading, helpfield3)
    message.channel.send({ embeds: [help] });

    //Invite command
  } else if (['invite'].includes(command) || ['davet'].includes(command)) {
    const invite = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(invitetitle)
      .setURL('https://discord.gg/mF3xQE69QP')
      .setDescription(invitedescription)
    message.channel.send({ embeds: [invite] });







    //Mute command
    //main mute command
  } else if (['mute'].includes(command) || ['sustur'].includes(command)) {
    if (db.get(`mute_${message.author.id}`)) { //db.get(`lang_
      db.delete(`mute_${message.author.id}`)
      message.channel.send(mute2) //"Removed from ignore list"
    } else {
      db.set(`mute_${message.author.id}`, true)
      message.channel.send(mute3) //"I will now ignore your trigger words"
    }

    //dm mute command
  } else if (['dmmute'].includes(command) || ['ömsustur'].includes(command)) {
    if (db.get(`dmmute_${message.author.id}`)) {
      db.delete(`dmmute_${message.author.id}`)
      message.channel.send(dmmute2)
    } else {
      db.set(`dmmute_${message.author.id}`, true)
      message.channel.send(dmmute3)
    }

    //Dm Command
  } else if (['dm'].includes(command) || ['öm'].includes(command)) {
    let mention = message.mentions.users.first();

    if (!mention) return message.channel.send(mention1); // checking if message don't have a user mention
    if (db.get(`dmmute_${message.author.id}`)) return message.channel.send(dmmute5); //Check to see if you muted the bot (User side only)
    message.channel.send(sent);
    //dm embed ADD THIS. 
    const dmembed = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(`${dmembedtitle}`)
      .setURL('https://discord.gg/kcEG3QXDDm')
      .setAuthor(`${dmembedauthor}`)
      .setDescription(`${dmembeddescription}`)
      .addField(`${dmembedfield1heading}`, `${dmembedfield1}`, false)
      .addField(`${dmembedfield2heading}`, `${dmembedfield2}`, true)
      .addField(`${dmembedfield3heading}`, `${dmembedfield3}`, true)
      .addField(`${dmembedfield4heading}`, `${dmembedfield4}`, true)
      .addField(`${dmembedfield5heading}`, `${dmembedfield5}`, true)
      .addField(`${dmembedfield6heading}`, `${dmembedfield6}`, true)
      .addField(`${dmembedfield7heading}`, `${dmembedfield7}`, true)
      .addField(`${dmembedfield8heading}`, `${dmembedfield8}`, false)
      .setFooter('I care about you. Please try to give the helplines just one chance. I know you can make it through this. Report a bug: https://discord.gg/kcEG3QXDDm. Type !dmmute to prevent others from telling me to send you DMs')

    mention.send({ embeds: [dmembed] }).catch(e => {
      message.channel.send(dmmute4); //If dm command has an error
    });

    //Change language command
  } else if (['set'].includes(command) || ['ayarla'].includes(command)) {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.channel.send(`:x: | ${seterror}`); //Checks to see if you have admin perms

    //Array for checking which language the user selected
    let langShort;
    for (l of langinfo) {
      if (l.includes(arguments[0])) {
        langShort = l[0];
      }
    }
    if (!langShort) return message.channel.send(nolang);
    if (langShort !== "en") db.set(`lang_${message.guild.id}`, langShort);
    else db.delete(`lang_${message.guild.id}`);
    return message.channel.send(require(`./lang/${langShort}.json`).langsus);

  } else if (['lang'].includes(command)) {
    const langs = new MessageEmbed()
      .setColor('#04d384')
      .setTitle(langstitle)
      .setAuthor(langsauthor)
      .setDescription(langlist.toString())
      .setURL('https://discord.gg/kcEG3QXDDm')
      .addField(langsfield1heading, langsfield1)
    message.channel.send({ embeds: [langs] });
  }
});

//And... client login...
client.login(token);



/* JOIN US on our Discord: https://discord.gg/YHvfUqVgWS.

Bot developers:

  Bobrobot1#1408
  CactusKing101#2624
  Killerjet101#7638
  pengu#1111
  HAHALOSAH#4627
  Parotay | Luke#3210

Message from developers:

  There is always hope, and even if the world seems dark right now, I know that anyone can make it through this.


                .=%+.
              .....=%%*=:.
            .........--=+*#*-
           ................:+#+
         .....................=%+.
        ........................=%*.
      ............................=%*.
     ...............................=%*:       ::      .===.
    ..................................=%#-  +#*=+##- :##-:-+#-
   -:.................................:+%%%@@-....-#@@@:....:+%=
   %%=.........:-....................*@#+=+%@*:.....-#@#-.....:+%=
    *@=........+@#:.................=@#.....=%@+:.....-#@#-.....:+%+
     @%:........-%%-................:%@=......=%@+:.....-#@#-.....:+%+
     #@:.........-@%:.........::.....:#@%=......=%@+:.....-#@#-.....:+%+.
     +@:..........*@+.........*@*:.:+%@%%@%=......=%@+:.....-#@#-.....:+@+.
     =@-..........=@*..........=#@*#@+...:*@%=......=%@+:.....-#%:......:+@+.
     .@=..........#@=....==......=*@@-.....:*@%=......=%@+:...............:+@+
      *@-........+@*.....+@%=......=%@*:.....:*@%=......=%@+................:+%+
       *@*:.....:#@#-.....:+@%=......=%@*:.....:*@%=......=+:.................:+%+
        :#@+:.....-#@#-.....:+@%=......=%@*:.....:*@%=..........................:+%:
          :#@+:.....-#@#-.....:+@%=......=%@*:.....:*@+...........................-@:
            :#@+:.....-#@#-.....:+@%=......=%@*:...................................##
              :#@+:.....-%@#-.....:+@%=......#@@*:.................................#@:
                :%@+:....-@@@#-.....:+@%=:.:+@+:+@*:...............................:*@+:
                  -#@+:..+@=.+@#-.....#@%@%%*:    +@*:...............................:*=
                    :*@*#@-    +@#=--*@+           .*@*:..............................
                      .-=        -+#+-               :#@*:............................
                                        :*@%######****#@%@*:.........................
                                       *@+:.....:-====-..-#@*:......................
                                       *%+=:...............-##:...................
                                        .=*#%%*+=:...............................
                                             .:=*#%%*+-:........................
                                                   .:=*#%#*++++**##%*:........
                                                          :--=--::::+@*:....
                                                                      +%*.
*/
