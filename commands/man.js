module.exports = {
	name: 'man',
	description: 'Имя взято с линукса так как владелец бота линуксоид. \nИспользуется для просмотра значения комманд. \nТребуется 1 аргумент(имя комманды). \nПример: \n.man [имя комманды]',
	execute(message, args, commands) {
		console.log('Суси бака')
        const mancommand = require(`./${args}`);
        message.reply('```' + mancommand.description + '```')
	},
};