# MOTS

![screenshot](img/screen.png)
![npm](https://img.shields.io/npm/v/mots)
![downloads/month](https://img.shields.io/npm/dm/mots)
![Telegram](https://img.shields.io/badge/t.me/yossthedev-Telegram-BLUE?style=flat&logo=Telegram)
![Twitter](https://img.shields.io/twitter/follow/yossthedev?style=social)

**MOTS** (**M**y **O**wn **T**iny **S**erver). A simple tool for hosting static files. Programmed in Typescript.

  Make with ❤️ and Typescript
  by Yoannis Sánchez Soto

## Features

* Intuitive and easy to use commands
* CORS enabled by default
* Hosts multiple folders

## TO DO

* Configuration File

## Map

<!-- toc -->
* [MOTS](#mots)
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
mots/0.0.6 linux-x64 node-v16.17.0
$ mots --help [COMMAND]
USAGE
  $ mots COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`mots about`](#mots-about)
* [`mots config`](#mots-config)
* [`mots config datadir`](#mots-config-datadir)
* [`mots help [COMMAND]`](#mots-help-command)
* [`mots prefab PREFAB`](#mots-prefab-prefab)
* [`mots prefab create PREFAB`](#mots-prefab-create-prefab)
* [`mots serve [FOLDER]`](#mots-serve-folder)

## `mots about`

Show About

```
USAGE
  $ mots about

DESCRIPTION
  Show About

EXAMPLES
  $ mots about
```

_See code: [dist/commands/about/index.ts](https://github.com/yossTheDev/mots/blob/v0.0.6/dist/commands/about/index.ts)_

## `mots config`

Configuration of mots

```
USAGE
  $ mots config

DESCRIPTION
  Configuration of mots
```

_See code: [dist/commands/config/index.ts](https://github.com/yossTheDev/mots/blob/v0.0.6/dist/commands/config/index.ts)_

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

## `mots prefab PREFAB`

Host Prefabs locally. Prefabs are Json files that contains the structure of an API

```
USAGE
  $ mots prefab [PREFAB]

ARGUMENTS
  PREFAB  Prefab to be hosted

DESCRIPTION
  Host Prefabs locally. Prefabs are Json files that contains the structure of an API

EXAMPLES
  $ mots prefab
```

_See code: [dist/commands/prefab/index.ts](https://github.com/yossTheDev/mots/blob/v0.0.6/dist/commands/prefab/index.ts)_

## `mots prefab create PREFAB`

Host Prefabs locally. Prefabs are Json files that contains the structure of an API

```
USAGE
  $ mots prefab create [PREFAB]

ARGUMENTS
  PREFAB  Name of Prefab to be created

DESCRIPTION
  Host Prefabs locally. Prefabs are Json files that contains the structure of an API

EXAMPLES
  $ mots prefab create
```

## `mots serve [FOLDER]`

Initialize Server

```
USAGE
  $ mots serve [FOLDER] [-p <value>]

ARGUMENTS
  FOLDER  (Optional) Folder to be hosted. If it is not provide default Public folder is served, write config datadir to
          show the default public directory location

FLAGS
  -p, --port=<value>  App PORT Ex:8080. If this is not defined default port has to be used (4000)

DESCRIPTION
  Initialize Server

EXAMPLES
  $ mots serve path/to/folder -p 8080
```

_See code: [dist/commands/serve/index.ts](https://github.com/yossTheDev/mots/blob/v0.0.6/dist/commands/serve/index.ts)_
<!-- commandsstop -->
