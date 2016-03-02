# smtp-server-cli

A development `smtp` server used to log incoming `smtp` messages.

## Installation

```
$ npm install -g smtp-server-cli
```

## Usage

```
$ smtp-server
```

### Options

By default the server will run on port `2525` to avoid requiring additional permissions. This can be overriden by providing the `-p` or `--port` option.

Example:

```
$ smtp-server --port 1025
```
