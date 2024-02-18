import gplay from "google-play-scraper";

let handler = async (m, { conn, text, usedPrefix, command }) => {
    try {
        if (!text[0]) throw 'Please provide a search term';

        await m.react('⬇️');

        const searchResults = await gplay.search({
            term: text,
            num: 5
        });

        if (!searchResults || searchResults.length === 0) {
            throw 'No results found for the given search term.';
        }

        let resultsList = '';
        for (const result of searchResults) {
            resultsList += `
*Title:* ${result.title}
*URL:* ${result.url}
*App ID:* ${result.appId}
*Developer:* ${result.developer}
*Score:* ${result.score} (${result.scoreText})
*Summary:* ${result.summary}

`;
        }

        await conn.sendMessage(m.chat, resultsList);
    } catch (error) {
        console.error(error);
        await console.log(error);
        await m.reply(`\n${error}\n`);
    }
};

handler.help = ['appsearch <search term>'];
handler.tags = ['search'];
handler.command = /^appsearch$/i;

export default handler;
