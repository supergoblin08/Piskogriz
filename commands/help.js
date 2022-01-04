module.exports = {
	name: 'help',
	description: 'Команда которая выводит ссылку со всеми коммандами. Не требует аргументов',
	execute(message, args) {
		message.author.send("")
	},
};