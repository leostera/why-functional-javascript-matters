.PHONY: repl

BIN_DIR = ./node_modules/.bin

repl:
	$(BIN_DIR)/babel-node

cleanall: clean
	rm -rf node_modules
