const http = require("http");
const dateEt = require("./dateTimeET");

const pageStart = '<!DOCTYPE html><html lang="et"><head><meta charset="utf-8"><title>Kati Põld, veebiprogrammeerimine</title></head><body>';
const pageBody = '<h1>Kati Põld, veebiprogrammeerimine</h1><p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kursusel ja ei oma mõistlikku sisu!</p>\n<p>Kaunist päeva!</p>\n<hr>';
const pageEnd = '\n</body>\n</html>'

const textRef = "txt/vanasonad.txt";

http.createServer(function(req, res){
	res.writeHead(200,{"Content-type": "text/html"});
	//res.write("Juhheii, läkski käima!");
	res.write(pageStart);
	res.write(pageBody);
	res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.Longdate() + "</p>");
	res.write("\n\t<p>Kellaaeg: " + dateEt.time() + "</p>");

	res.write(pageEnd);
	return res.end();
}).listen(5326);