# MOTS

My Own Tiny Server. Simple and usefull local server to host your static files.

![npm](https://img.shields.io/npm/v/mots)
![downloads/month](https://img.shields.io/npm/dm/mots)

# Features

* CORS Enabled

# TO DO

* Configuration File
* Serve multiple folders

## Map

<!-- toc -->
* [MOTS](#mots)
* [Features](#features)
* [TO DO](#to-do)
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g mots
$ mots COMMAND
running command...
$ mots (--version)
mots/0.0.4 linux-x64 node-v16.17.0
$ mots --help [COMMAND]
USAGE
  $ mots COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mots config`](#mots-config)
* [`mots config datadir`](#mots-config-datadir)
* [`mots help [COMMAND]`](#mots-help-command)
* [`mots serve [FOLDER]`](#mots-serve-folder)

## `mots config`

Configuration of mots

```
USAGE
  $ mots config

DESCRIPTION
  Configuration of mots
```

_See code: [dist/commands/config/index.ts](https://github.com/yossTheDev/mots/blob/v0.0.4/dist/commands/config/index.ts)_

## `mots config datadir`

Show default hosted folder

```
USAGE
  $ mots config datadir

DESCRIPTION
  Show default hosted folder

EXAMPLES
  $ mots config datadir
  /home/USER/.local/share/mserv
```

## `mots help [COMMAND]`

Display help for mots.

```
USAGE
  $ mots help [COMMAND] [-n]

ARGUMENTS
  COMMAND  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for mots.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.1.12/src/commands/help.ts)_

## `mots serve [FOLDER]`

Initialize Server

```
USAGE
  $ mots serve [FOLDER]

ARGUMENTS
  FOLDER  (Optional) Folder to be hosted. If it is not provide default Public folder is served, write config datadir to
          show the default public directory location

DESCRIPTION
  Initialize Server
```

_See code: [dist/commands/serve/index.ts](https://github.com/yossTheDev/mots/blob/v0.0.4/dist/commands/serve/index.ts)_
<!-- commandsstop -->
