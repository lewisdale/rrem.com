var fs = require("fs");


function getProperties() {
	var properties = {};
	fs.readFileSync("properties.csv", "utf8").split(/\s*\n\s*/).forEach(function(line) {
		if (!line) return;
		line = line.split(",");
		var key = line[0];
		properties[key] = {};
		properties[key].name = line[1];
		properties[key].link = line[2];
	});
	return properties;
};

var properties = getProperties();
var nav = {
	"about us": "index.html",
	services: "services.html",
	"managed properties": undefined,
	"properties": properties,
	//news: "news.html",
	//clients: "clients.html",
	//"contact us": "contact.html",
	"search all properties": "$frame.html?http%3A%2F%2Fwww.showcase.com",
	//"quick links": "links.html",
	careers: "careers.html"
};

function buildNavigation() {
	return "<ul>" + Object.keys(nav).map(function(key) {
		var value = nav[key];
		if (!value) {
			return '<li>' + key + '</li>';
		}
		if (typeof value === "string") {
			return '<li><a href="' + value + '">' + key + '</a></li>';
		}
		return "<ul>" + Object.keys(value).map(function(prop) {
			return '<li><a href="$frame.html?' + encodeURIComponent(value[prop].link) + '">' + prop + '</a></li>'
			//return '<li><a href="' + prop + '.property.html">' + prop + '</a></li>'
		}).join("\n") + "</ul>";
	}).join("\n") + "</ul>";
};


var template = fs.readFileSync("$template.html", "utf8");
var navText = buildNavigation();


function buildPropertyPage(name) {
	var obj = properties[name];
	// FIXME remove the crappy style hack
	return [
		'<h1 style="color:white">' + obj.name + '</h1>',
		'<p><a href="$frame.html?' + encodeURIComponent(obj.link) + '">showcase profile</a></p>'
	].join("\n");
};

// create all property pages
Object.keys(properties).forEach(function(key) {
	var content = template
		.replace("{{nav}}", navText)
		.replace("{{content}}", buildPropertyPage(key))
	var fn = key + ".property.html";
	fs.writeFileSync(fn, content);
	console.log("created: " + fn);
});

// create all content files from partials
fs.readdirSync(".").filter(function(fn) {
	return fn.match(/\.partial\.html$/);
}).forEach(function(fn) {
	var partial = fs.readFileSync(fn, "utf8");
	
	var content = template
		.replace("{{nav}}", navText)
		.replace("{{content}}", partial);
	
	fn = fn.replace(".partial.html", ".html");
	fs.writeFileSync(fn, content);
	console.log("created: " + fn);
});
