var sys = require('sys'),
	http = require('http'),
	url = require('url'),
	path = require('path'),
	child_process = require('child_process'),
	fs = require('fs'),
	DefaultFile = ['index.html', 'index.htm', 'index.wjs', 'index.txt', 'index.asp', 'index.json'],
 	ROOT_PATH = null;
 	CURPATH = process.cwd();
 	PORT = process.argv[2] || 8813;


var isWin = process.env.OS.toLowerCase().indexOf('windows') > -1 ? true : false;

var mime = {
	lookupExtension: function(ext, fallback) {
		return mime.TYPES[ext.toLowerCase()] || fallback || 'text/plain';
	},

	TYPES: {
		'.3gp': 'video/3gpp',
		'.a': 'application/octet-stream',
		'.ai': 'application/postscript',
		'.aif': 'audio/x-aiff',
		'.aiff': 'audio/x-aiff',
		'.asc': 'application/pgp-signature',
		'.asf': 'video/x-ms-asf',
		'.asm': 'text/x-asm',
		'.asp': 'text/html',
		'.php': 'text/html',
		'.asx': 'video/x-ms-asf',
		'.atom': 'application/atom+xml',
		'.au': 'audio/basic',
		'.avi': 'video/x-msvideo',
		'.bat': 'application/x-msdownload',
		'.bin': 'application/octet-stream',
		'.bmp': 'image/bmp',
		'.bz2': 'application/x-bzip2',
		'.c': 'text/x-c',
		'.cab': 'application/vnd.ms-cab-compressed',
		'.cc': 'text/x-c',
		'.chm': 'application/vnd.ms-htmlhelp',
		'.class': 'application/octet-stream',
		'.com': 'application/x-msdownload',
		'.conf': 'text/plain',
		'.cpp': 'text/x-c',
		'.crt': 'application/x-x509-ca-cert',
		'.css': 'text/css',
		'.csv': 'text/csv',
		'.cxx': 'text/x-c',
		'.deb': 'application/x-debian-package',
		'.der': 'application/x-x509-ca-cert',
		'.diff': 'text/x-diff',
		'.djv': 'image/vnd.djvu',
		'.djvu': 'image/vnd.djvu',
		'.dll': 'application/x-msdownload',
		'.dmg': 'application/octet-stream',
		'.doc': 'application/msword',
		'.dot': 'application/msword',
		'.dtd': 'application/xml-dtd',
		'.dvi': 'application/x-dvi',
		'.ear': 'application/java-archive',
		'.eml': 'message/rfc822',
		'.eps': 'application/postscript',
		'.exe': 'application/x-msdownload',
		'.f': 'text/x-fortran',
		'.f77': 'text/x-fortran',
		'.f90': 'text/x-fortran',
		'.flv': 'video/x-flv',
		'.for': 'text/x-fortran',
		'.gem': 'application/octet-stream',
		'.gemspec': 'text/x-script.ruby',
		'.gif': 'image/gif',
		'.gz': 'application/x-gzip',
		'.h': 'text/x-c',
		'.hh': 'text/x-c',
		'.htm': 'text/html',
		'.html': 'text/html',
		'.ico': 'image/vnd.microsoft.icon',
		'.ics': 'text/calendar',
		'.ifb': 'text/calendar',
		'.iso': 'application/octet-stream',
		'.jar': 'application/java-archive',
		'.java': 'text/x-java-source',
		'.jnlp': 'application/x-java-jnlp-file',
		'.jpeg': 'image/jpeg',
		'.jpg': 'image/jpeg',
		'.js': 'application/javascript;charset=utf-8',
		'.json': 'application/json',
		'.log': 'text/plain;charset=utf-8',
		'.m3u': 'audio/x-mpegurl',
		'.m4v': 'video/mp4',
		'.man': 'text/troff',
		'.mathml': 'application/mathml+xml',
		'.mbox': 'application/mbox',
		'.mdoc': 'text/troff',
		'.me': 'text/troff',
		'.mid': 'audio/midi',
		'.midi': 'audio/midi',
		'.mime': 'message/rfc822',
		'.mml': 'application/mathml+xml',
		'.mng': 'video/x-mng',
		'.mov': 'video/quicktime',
		'.mp3': 'audio/mpeg',
		'.mp4': 'video/mp4',
		'.mp4v': 'video/mp4',
		'.mpeg': 'video/mpeg',
		'.mpg': 'video/mpeg',
		'.ms': 'text/troff',
		'.msi': 'application/x-msdownload',
		'.odp': 'application/vnd.oasis.opendocument.presentation',
		'.ods': 'application/vnd.oasis.opendocument.spreadsheet',
		'.odt': 'application/vnd.oasis.opendocument.text',
		'.ogg': 'application/ogg',
		'.p': 'text/x-pascal',
		'.pas': 'text/x-pascal',
		'.pbm': 'image/x-portable-bitmap',
		'.pdf': 'application/pdf',
		'.pem': 'application/x-x509-ca-cert',
		'.pgm': 'image/x-portable-graymap',
		'.pgp': 'application/pgp-encrypted',
		'.pkg': 'application/octet-stream',
		'.pl': 'text/x-script.perl',
		'.pm': 'text/x-script.perl-module',
		'.png': 'image/png',
		'.pnm': 'image/x-portable-anymap',
		'.ppm': 'image/x-portable-pixmap',
		'.pps': 'application/vnd.ms-powerpoint',
		'.ppt': 'application/vnd.ms-powerpoint',
		'.ps': 'application/postscript',
		'.psd': 'image/vnd.adobe.photoshop',
		'.py': 'text/x-script.python',
		'.qt': 'video/quicktime',
		'.ra': 'audio/x-pn-realaudio',
		'.rake': 'text/x-script.ruby',
		'.ram': 'audio/x-pn-realaudio',
		'.rar': 'application/x-rar-compressed',
		'.rb': 'text/x-script.ruby',
		'.rdf': 'application/rdf+xml',
		'.roff': 'text/troff',
		'.rpm': 'application/x-redhat-package-manager',
		'.rss': 'application/rss+xml',
		'.rtf': 'application/rtf',
		'.ru': 'text/x-script.ruby',
		'.s': 'text/x-asm',
		'.sgm': 'text/sgml',
		'.sgml': 'text/sgml',
		'.sh': 'application/x-sh',
		'.sig': 'application/pgp-signature',
		'.snd': 'audio/basic',
		'.so': 'application/octet-stream',
		'.svg': 'image/svg+xml',
		'.svgz': 'image/svg+xml',
		'.swf': 'application/x-shockwave-flash',
		'.t': 'text/troff',
		'.tar': 'application/x-tar',
		'.tbz': 'application/x-bzip-compressed-tar',
		'.tcl': 'application/x-tcl',
		'.tex': 'application/x-tex',
		'.texi': 'application/x-texinfo',
		'.texinfo': 'application/x-texinfo',
		'.text': 'text/plain',
		'.tif': 'image/tiff',
		'.tiff': 'image/tiff',
		'.torrent': 'application/x-bittorrent',
		'.tr': 'text/troff',
		'.txt': 'text/plain',
		'.vcf': 'text/x-vcard',
		'.vcs': 'text/x-vcalendar',
		'.vrml': 'model/vrml',
		'.war': 'application/java-archive',
		'.wav': 'audio/x-wav',
		'.wma': 'audio/x-ms-wma',
		'.wmv': 'video/x-ms-wmv',
		'.wmx': 'video/x-ms-wmx',
		'.wrl': 'model/vrml',
		'.wsdl': 'application/wsdl+xml',
		'.xbm': 'image/x-xbitmap',
		'.xhtml': 'application/xhtml+xml',
		'.xls': 'application/vnd.ms-excel',
		'.xml': 'application/xml',
		'.xpm': 'image/x-xpixmap',
		'.xsl': 'application/xml',
		'.xslt': 'application/xslt+xml',
		'.yaml': 'text/yaml',
		'.yml': 'text/yaml',
		'.zip': 'application/zip'
	}
};

function checkRootPath() {
	if (process.argv.length > 3) {
		var arg = process.argv[3];
		if (arg.charAt(0) === '/' || arg.charAt(0) === '\\') {
			ROOT_PATH = process.argv[3];
		} else {
			if (arg.charAt(0) === '.') {
				arg = arg.substr(1);
			}

			ROOT_PATH = CURPATH + arg;
		}
	} else {
		ROOT_PATH = CURPATH;
	}

	//process.argv.length > 3 ? process.cwd() + process.argv[3] : process.cwd()
}

function exec(filename, response, request) {
	var process = child_process.fork(filename);
	process.on('message', function(msg) {
		if (msg.Content == undefined) {
			var errMsg = 'Error 193:' + filename + ' has error!\n';
			console.log(errMsg);
			goToError(400, response, errMsg);
			return;
		}
		if (!(msg.ContentType)) {
			msg.ContentType = 'text/html';
		}

		try {
			response.writeHead(200, {
				'Content-Type': msg.ContentType
			});
			response.end(msg.Content.toString());
		} catch (e) {
			console.log('Stack:' + e.stack);
			var loc = e.stack.replace(/Error\n/).split(/\n/)[1].replace(/^\s+|\s+$/, '');
			console.log('Location: ' + loc + '');
			return;
		} finally {
			process.kill();
		}
	});
	if (request.method == 'POST') {
		handleRequest(request, response, function(postData) {
			process.send({
				'headers': request.headers,
				'url': request.url,
				'method': request.method,
				'formData': postData
			});
		});
	} else {
		process.send({
			'headers': request.headers,
			'url': request.url,
			'method': request.method
		});
	}
}

function handleRequest(request, response, callback) {
	var postData = '';
	request.addListener('data', function(postDataChunk) {
		postData += postDataChunk
			//console.log('Received POST data chunk '' + postDataChunk + ''.')
	});
	request.addListener('end', function() {
		//console.log('Received POST data:' + postData);
		callback.call(this, postData);
	});
}

function rmFile(fileName) {
	if (isWin) {
		require('child_process').exec('del /f /s /q ' + fileName);
	} else {
		require('child_process').exec('rm -f ' + fileName);
	}
}

function writeFile(fileName, content) {
	fs.writeFile(fileName, content, function(err) {
		if (err) throw err;
		/*if (isWin) {
			require('child_process').exec('attrib +h ' + fileName);
		}*/
	});
}

function readFile(filename, response, request) {
	if (path.extname(filename) == '.wjs') {
		exec(filename, response, request);
	} else {
		fs.readFile(filename, function(err, file) {
			if (err) {
				response.writeHead(500, {
					'Content-Type': 'text/plain'
				});
				response.end(err + '\n');
				return;
			}
			response.writeHead(200, {
				'Content-Type': mime.lookupExtension(path.extname(filename)),
        'Cache-Control': 'no-cache'
			});
			if (path.extname(filename) != '.wjs') {
				response.end(file);
			} else {
				response.end();
			}
		});
	}
}

function goToError(num, response, text) {
	response.writeHead(num, {
		'Content-Type': 'text/plain'
	});
	response.end(text + '\n');
}

function goTo404(response) {
	response.writeHead(404, {
		'Content-Type': 'text/plain'
	});
	response.end('404 Not Found\n');
}

function formatBody(parent, files) {
	var res = [];
	res.push('<!doctype>');
	res.push('<html>');
	res.push('<head>');
	res.push('<meta http-equiv="Content-Type" content="text/html;charset=utf-8"></meta>');
	res.push('<title>Tiny Http Server</title>');
	res.push('</head>');
	res.push('<body>');
	res.push('<ul>');
	res.push('<li><a href="../">.. </a></li>');
	files.forEach(function(val) {
		var stat = fs.statSync(path.join(parent, val));
		if (stat.isDirectory(val)) {
			val = path.basename(val) + '/';
			res.push('<li><a href="' + val + '"><strong>' + val + '</strong></a></li>');
		} else {
			val = path.basename(val);
			res.push('<li><a href="' + val + '">' + val + '</a></li>');
		}
	});
	res.push('</ul>');
	res.push('</body>');
	return res.join('');
}

//list directory
function listDirectory(parentDirectory, res) {
	fs.readdir(parentDirectory, function(error, files) {
		var body = formatBody(parentDirectory, files);
		res.writeHead(200, {
			'Content-Type': 'text/html;charset=utf-8',
			'Content-Length': Buffer.byteLength(body, 'utf8'),
			'Server': 'NodeJs(' + process.version + ')'
		});
		res.write(body, 'utf8');
		res.end();
	});
}

function listDefaultFile(basedir, response, request, file, index) {
	var fileName = basedir.replace(/[\/\\]+$/gi, '') + '\\' + file;
	fs.exists(fileName, function(exists) {
		if (exists) {
			readFile(fileName, response, request);
		} else {
      index = ~~index;
			if (index < 0) {
				index = 0;
			} else if (index >= DefaultFile.length) {
				listDirectory(basedir, response);
				return;
			}
			listDefaultFile(basedir, response, request, DefaultFile[index], index + 1);
		}
	});
}

function checkUri(basedir, response, request, uri) {
	if (fs.lstatSync(basedir).isDirectory()) {
		if (!(/[\\\/]$/gi.test(basedir))) {
			//console.log(response.headers);
			var queryString = url.parse(request.url).search,
			Location = uri + '/' + (queryString == null ? '' : queryString);

			response.writeHead(301, {
        Location: Location
			});

			response.end();
			return;
		} else {
			listDefaultFile(basedir, response, request, DefaultFile[0], 0);
		}
	} else {
		readFile(basedir, response, request);
	}
}

function createServer() {
	http.createServer(function(request, response) {
		var uri = url.parse(request.url).pathname.replace(/%20/g, ' ');
		var re = /(%[0-9A-Fa-f]{2}){3}/g;
		if (re.test(uri)) {
			//能够正确显示中文，将三字节的字符转换为utf-8编码
			uri = uri.replace(re, function(word) {
				var buffer = new Buffer(3),
					array = word.split('%');
				array.splice(0, 1);
				array.forEach(function(val, index) {
					buffer[index] = parseInt('0x' + val, 16);
				});
				return buffer.toString('utf8');
			});
		}

		
		var filename = path.join(ROOT_PATH, uri);

		fs.exists(filename, function(exists) {
			if (!exists) {
				/*if not exists the path,check if exists the executable file*/
				filename = filename.replace(/[\/\\]+$/gi, '') + '.txt';
				fs.exists(filename, function(exists) {
					if (exists)
						readFile(filename, response, request);
					else
						goTo404(response);
				});
			} else {
				checkUri(filename, response, request, uri);
			}
		});
	}).listen(PORT);

	setTimeout(function() {
		console.log('Server running at http://localhost:' + PORT
			+ ', the webroot is: ' + ROOT_PATH
		);
	}, 1000);
}

function startServer() {
	checkRootPath();
	setTimeout(createServer, 1000);
}

function start() {
	fs.readFile('.pidTmp', function(err, file) {
		if (!err) {
			var arr = file.toString().split('\r\n');
			if (arr[1] == PORT) {
				console.log('Find old process is running, killing...');
				if (isWin) {
                    // windows 貌似没有 gracefully 关闭。
                    // 用 process.kill 会遇到进程关不了的情况，没有 exit 事件响应，原因不明！
                    require('child_process').exec('taskkill /PID ' + arr[0] + ' /T /F', startServer);
                } else {
                    // try to gracefully kill it.
                    process.kill(arr[0], 'SIGTERM');
                    startServer();
                }
			} else {
				startServer();
			}
		} else {
			startServer();
		}

		process.nextTick(function() {
			writeFile('.pidTmp', process.pid + '\r\n' + PORT);
		});
	});
}

process.on('uncaughtException', function(err) {
	if (err.toString().indexOf('EADDRINUSE') > -1) {
		console.error('Port ' + PORT + ' in use!');
	} else {
		console.error('Error caught in uncaughtException event:', err);
	}
	rmFile('.pidTmp');
	process.exit();
});

exports.run = start;

if (!/index\.js$/i.test(process.argv[1])) {
	start();
}


