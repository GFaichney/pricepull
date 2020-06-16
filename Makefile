setup:
	rm -rf _install
	mkdir _install
	curl -o _install/node.pkg https://nodejs.org/dist/v12.16.3/node-v12.16.3.pkg
	open -W _install/node.pkg
	npm i


