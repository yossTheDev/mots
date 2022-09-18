# MSERV

Simple and usefull local server to host your static files.

=================

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![CircleCI](https://circleci.com/gh/oclif/hello-world/tree/main.svg?style=shield)](https://circleci.com/gh/oclif/hello-world/tree/main)
[![Downloads/week](https://img.shields.io/npm/dw/oclif-hello-world.svg)](https://npmjs.org/package/oclif-hello-world)
[![License](https://img.shields.io/npm/l/oclif-hello-world.svg)](https://github.com/oclif/hello-world/blob/main/package.json)

<!-- toc -->
* [MSERV](#mserv)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g mserv
$ mserv COMMAND
running command...
$ mserv (--version)
mserv/0.0.1 linux-x64 node-v16.17.0
$ mserv --help [COMMAND]
USAGE
  $ mserv COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mserv config`](#mserv-config)
* [`mserv config datadir`](#mserv-config-datadir)
* [`mserv help [COMMAND]`](#mserv-help-command)
* [`mserv serve [FOLDER]`](#mserv-serve-folder)

## `mserv config`

Configuration of Mserv

```
USAGE
  $ mserv config

DESCRIPTION
  Configuration of Mserv
```

_See code: [dist/commands/config/index.ts](https://github.com/Apps/hello-world/blob/v0.0.1/dist/commands/config/index.ts)_

## `mserv config datadir`

Show default hosted folder

```
USAGE
  $ mserv config datadir

DESCRIPTION
  Show default hosted folder

EXAMPLES
  $ mserv config datadir
  /home/USER/.local/share/mserv
```

## `mserv help [COMMAND]`

Display help for mserv.

```
USAGE
  $ mserv help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for mserv.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `mserv serve [FOLDER]`

Initialize Server

```
USAGE
  $ mserv serve [FOLDER]

ARGUMENTS
  FOLDER  (Optional) Folder to be hosted. If it is not provide default Public folder is served, write config datadir to
          know the default public directory location

DESCRIPTION
  Initialize Server
```

_See code: [dist/commands/serve/index.ts](https://github.com/Apps/hello-world/blob/v0.0.1/dist/commands/serve/index.ts)_
<!-- commandsstop -->
