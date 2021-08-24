---
title: Starting a terminal from Notion
date: 2021-08-24
category: blog
tags: ["cli", "notion"]
description:
  Notion is my current go-to app for collecting work and personal life notes.
  Given the abundance of cloud-based collaborative tools (Google docs etc) it
  also became my organised jumping pad to whatever set of documents I was
  working at the moment.
---

> Note: the following tip uses [Gotty](https://github.com/yudai/gotty) in a
> fairly insecure way (no username or password). You can improve the security by
> following the guidelines available on its
> [Github page](https://github.com/yudai/gotty#security-options)

Notion is my current go-to app for collecting work and personal life notes.
Given the abundance of cloud-based collaborative tools (Google docs etc) it also
became my organised jumping pad to whatever set of documents I was working at
the moment.

One thing that I was missing was the possibility to take action on my local
machine, for example opening a local pdf file or opening a terminal in a
specific directory. I then quickly discovered
[Gotty](https://github.com/yudai/gotty) which is essentially a webserver that
can run and render a terminal command in your browser. In fact, the rendering
speed on my Macbook Pro running Chrome is pretty decent even compared with
[Kitty](https://sw.kovidgoyal.net/kitty/) (the native, GPU-accelerated app that
I sometimes use).

I run Gotty in the background to launch a Zsh shell whenever one connects to
`http://localhost:3005`

```bash
gotty --permit-arguments -p 3005 -w zsh
```

The options `--permit-arguments` and `-w` allow to, respectively, send
additional arguments to the `zsh` command (more on this later) and also to
interactively send keystrokes to `zsh` when you open the page. **These options
represent obviously a security risk if your machine can be reached from the
internet**; Mine isn't so I did'nt setup any kind of additional measures such as
those suggested on the Gotty's
[Github page](https://github.com/yudai/gotty#security-options).

At this point, whenever you connect to `http://localhost:3005` a new tab is
opened with a fully functioning terminal.

I am an avid Tmux user, so I want to open a new Tmux session whenever a click on
a Gotty link. To do this, you can forge a little more complex url and pass
additional commands to Zsh with `-c`:

```
http://localhost:3005/?arg=-c&arg=(tmux%20new-session%20-c%20%2FUsers%2Fguest%20%0A)
```

Since creating such kind of URLs can be cumbersome, I resorted to a small shell
function that, using `jq`, can forge an URL for opening a Tmux session in a
specific `directory`and launching a `command` in it:

```bash
ntmuxc () {
	directory=$(grealpath "$1" | tr -d '\n\')
	shellcomm="${@:2}"
	command="tmux new-session -c $directory $shellcomm"
	ecommand=$(echo $command | jq -sRr @uri)
	echo "http://localhost:3005/?arg=-c&arg=($ecommand)" | pbcopy
}
```

So for example, the following copies on the clipboard the URL that will open
`htop` from the current directory

```bash
ntmuxc . htop
```

i.e.,

```bash
http://localhost:3005/?arg=-c&arg=(tmux%20new-session%20-c%20%2FUsers%2Fguest%20htop%0A)
```

Hopefully this can improve the life to someone else!
