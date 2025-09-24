const http = require("http");
const fs = require("fs");
const dateEt = require("./src/dateTimeET");
const textRef = "txt/vanasonad.txt";
const pageStart = '<!DOCTYPE html>\n<html lang="et">\n<head>\n\t<meta charset="utf-8">\n\t<title>Andrus Rinde, veebiprogrammeerimine</title>\n</head>\n<body>';
const pageBody = '\n\t<h1>Andrus Rinde, veebiprogrammeerimine</h1>\n\t<p>See leht on loodud <a href="https://www.tlu.ee">Tallinna أœlikoolis</a> veebiprogrammeerimise kurusel ja ei oma mأµistlikku sisu.</p>\n\t<p>Algul lihtsalt HTML ja varsti juba Node.Js.</p>\n\t<hr>';
const pageEnd = '\n</body>\n</html>';

http.createServer(function(req, res){
	res.writeHead(200, {"Content-type": "text/html"});
	fs.readFile(textRef, "utf8", (err, data)=>{
		if(err){
			res.write(pageStart);
			res.write(pageBody);
			res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p><p>Kahjuks tأ¤naseks أ¼htki vanasأµna vأ¤lja pakkuda pole!</p>");
			res.write(pageEnd);
			return res.end();
		} else {
			let oldWisdomList = data.split(";");
			let folkWisdomOutput = "\n\t<ol>";
			for (let i = 0; i < oldWisdomList.length; i ++){
				folkWisdomOutput += "\n\t\t<li>" + oldWisdomList[i] + "</li>";
			}
			folkWisdomOutput += "\n\t</ol>";
			res.write(pageStart);
			res.write(pageBody);
			res.write("\n\t<p>Tأ¤na on " + dateEt.weekDay() + " " + dateEt.longDate() + ".</p>");
			res.write("\n\t<h2>Valik Eesti vanasأµnu</h2>")
			res.write(folkWisdomOutput);
			res.write(pageEnd);
			return res.end();
		}
	});
}).listen(5326);