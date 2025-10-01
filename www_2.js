const http = require("http");
const fs = require("fs");
//lisame mooduli, et päringu URL-i mõista
const url = require("url")
const path = require ("path")
const dateEt = require("./dateTimeET.js");
const textRef = ("./vanasonad.txt");
const pageStart = '<!DOCTYPE html><html lang="et"><head><meta charset="utf-8"><title>Kati Põld, veebiprogrammeerimine</title></head><body>';
const pageBody = '<h1>Kati Põld, veebiprogrammeerimine</h1><p>See leht on loodud <a href="https://www.tlu.ee">Tallinna Ülikoolis</a> veebiprogrammeerimise kursusel ja ei oma mõistlikku sisu!</p>\n<p>Kaunist päeva!</p>\n<hr>';
const pageBanner = '<img src="vp_banner_2025_AA.jpg" alt="Kursuse bänner">';
const pageEnd = '\n</body>\n</html>'

http.createServer(function(req, res){
	//vaatan päringut (req), mida klient tahab
	console.log("Praegune URL: "+req.url);
	//eraldame
	let currentUrl = url.parse(req.url, true);
	console.log("Puhas url: "+ currentUrl.pathname); 
	
	//loon marsuudid erinevate url-ide jaoks
	
	//avaleht
	if(currentUrl.pathname === "/"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageStart);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.Longdate() + ".</p>");
		res.write("\n\t<p>Vaata ka valikut <a href='/vanasonad'>vanasõnu</a>.</p>");
		res.write("\n\t<p>Vaata ka minu <a href='/hobid'>hobisid</a>.</p>");
		res.write(pageEnd);
		return res.end();
	}
	
	else if(currentUrl.pathname === "/vanasonad"){
		res.writeHead(200, {"Content-type": "text/html"});
		fs.readFile(textRef, "utf8", (err, data)=>{
			if(err){
				res.write(pageStart);
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.Longdate() + ".</p><p>Kahjuks tänaseks ühtki vanasõna välja pakkuda pole!</p>");
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
				res.write(pageBanner);
				res.write(pageBody);
				res.write("\n\t<p>Täna on " + dateEt.weekDay() + " " + dateEt.Longdate() + ".</p>");
				res.write("\n\t<h2>Valik Eesti vanasõnu</h2>")
				res.write(folkWisdomOutput);
				res.write(pageEnd);
				return res.end();
			}
		});
	}
	
	else if(currentUrl.pathname === "/vp_banner_2025_AA.jpg"){
		let bannerPath = path.join(__dirname, "images", "vp_banner_2025_AA.jpg");
		fs.readFile(bannerPath, (err, data)=>{
			if(err){
				throw(err);
			} else {
				res.writeHead(200, {"Content-Type": "image/jpeg"});
				res.end(data);
			}
		});
	}	
	
	else if(currentUrl.pathname === "/imagine_dragons.jpg"){
		let imgPath = path.join(__dirname, "images", "imagine_dragons.jpg");
		fs.readFile(imgPath, (err, data)=>{
			if(err){
				res.writeHead(404, {"Content-type": "text/plain"});
				res.end("Pilt puudub!");
			} else {
				res.writeHead(200, {"Content-Type": "image/jpeg"});
				res.end(data);
			}
		});
	}
	
	// uus marsuut hobide lehele
	else if(currentUrl.pathname === "/hobid"){
		res.writeHead(200, {"Content-type": "text/html"});
		res.write(pageStart);
		res.write(pageBanner);
		res.write(pageBody);
		res.write("\n\t<h2>Minu hobid!</h2>");
		res.write('\n\t<p>Mulle meeldib metsas jalutamine - kui otsite toredaid matkaradu, siis külastage <a href="https://www.rmk.ee">RMK koduleht</a></p>');
		res.write('\n\t<p>Minu teine suur kirg on reisimine ja uute elamuste avastamine <a href="https://www.tripadvisor.com/">Tripadvisor</a></p>');
		res.write('\n\t<img src="imagine_dragons.jpg" alt="Imagine Dragonsi kontsert Milaanos" width="400">');
		res.write(pageEnd);
		return res.end();
	}
	
	else {
		res.end("Viga 404, sellist lehte ei ole olemas!");
	}
}).listen(5326);