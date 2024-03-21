Frontend vs backend
0:00
Every website can be split up into two
0:02
parts: the frontend and the backend.
0:05
The frontend is all the visual stuff
0:07
you see on the web page: the images, the
0:09
text, the buttons, and the backend is
0:11
what saves and manages your data, for
0:14
example your amazon order history. In
0:16
this video I'm going to explain all the
0:18
technologies that are used in the front
0:19
end of a web application, and in another
0:21
video we'll explore the backend let's
0:24
get started.
HTML
0:26
We're going to start with a blank web
0:28
page and the first technology we're
0:30
going to look at is html. html stands for
0:34
hyper text markup language and is used
0:36
to add content to our web page. For
0:39
example, I can write this bit of html to
0:41
add a button.
0:43
I can also add other types of content,
0:45
like images, and text and if I write more
0:48
html, it will add more content to my page.
CSS
0:52
But you'll notice that our page doesn't
0:53
look very good. That's where css comes in.
0:56
css stands for cascading style sheets,
1:00
and based on the name, it's used to style
1:02
our web page, so it's used to make our
1:03
web page look good, by letting us adjust
1:06
colors, sizes, spacing, things like that.
1:10
Let's add some css to our page.
1:13
So now that looks much better, but we're
JavaScript & JavaScript framework
1:15
not done here.
1:16
Let's say that I want to filter these
1:18
products, and only show one brand of
1:20
shoes, so I click this checkbox.
1:22
But you'll notice that nothing happens
1:24
and this is where javascript comes in.
1:26
html and css only display things on our
1:29
web page, but javascript is what makes
1:32
our web page interactive.
1:34
So for example, when we click something,
1:36
and type something, a bit of javascript
1:38
code will update the page based on what
1:40
we did.
1:42
The most important feature of javascript
1:44
is something called the document object
1:46
model, or the dom.
1:48
The dom allows javascript to change the
1:50
web page.
1:51
For example, this bit of javascript code
1:54
uses the dom to change the text in the
1:56
button.
1:57
And this is how javascript makes pages
1:59
interactive.
2:00
However, using the dom directly like this
2:03
is really repetitive, and hard to manage
2:05
and that's why we use a javascript
2:07
framework.
2:08
Javascript frameworks give us a much
2:10
nicer way to create our web page, and
2:12
they take care of updating the page for
2:14
us, so we never use the dom directly
2:16
anymore.
2:17
The most popular ones are react.js,
2:20
angular, and vue.js.
Bundler & transpiler
2:22
Now let's take a step back, and look at
2:24
javascript again.
2:26
Javascript as a language is missing a
2:28
lot of features that other programming
2:29
languages have.
2:31
One of these features is being able to
2:32
split up our code into different files,
2:34
and to organize our code.
2:36
To solve this we have to use something
2:38
called a bundler. The most popular one
2:40
you've probably heard of is called
2:42
webpack.
2:43
Webpack lets us split up our javascript
2:45
code into many different files, and once
2:48
we're ready to put it on our website,
2:49
webpack will combine all of these files,
2:52
or bundle all of these files into one
2:55
javascript file that we can put on our
2:57
website.
2:58
Another tool that we use is called a
3:00
transpiler. The most popular one you
3:02
probably heard of is called typescript.
3:05
A transpiler adds extra features onto
3:07
javascript. It lets us write an enhanced
3:10
version of javascript, and then once
3:12
we're done it will transform the
3:14
enhanced javascript back into normal
3:16
javascript because browsers like google
3:19
chrome can only understand normal
3:21
javascript.
3:22
So those are the major technologies in
3:24
the javascript world.
CSS preprocessor
3:26
Now we're going to move over to css.
3:28
css as a language has the same problems
3:31
as javascript. We can't organize our code
3:34
into different files, and css is missing
3:36
a lot of useful features, so we also use
3:39
a bundler and a transpiler for css.
3:42
There's a special name for this called a
3:44
css preprocessor. It's basically the
3:47
combination of a bundler and a
3:48
transpiler. The most popular css
3:51
preprocessor you probably heard of is
3:53
called sass.
3:55
sass lets us organize our css into
3:57
different files, and it lets us write
3:59
enhanced css,
4:01
and then it will bundle all those files
4:03
together into one file, and it will
4:05
transform the enhanced css back into
4:08
normal css. So you can think of it sort
4:11
of like a bundler and a transpiler
4:13
combined. Now, once we had css
CSS framework
4:15
preprocessors, developers start to create
4:18
css frameworks, the most popular one
4:21
being bootstrap.
4:23
css frameworks are basically a whole
4:25
bunch of css code that someone else
4:27
wrote, and it helps us solve common
4:29
problems, so using a framework like
4:31
bootstrap saves us a lot of time.
HTTP
4:35
The last thing we're going to look at is
4:36
how does the frontend communicate with
4:38
the backend?
4:39
For example let's say I'm on amazon and
4:41
I want to make an order. How does this
4:43
order get sent from my computer to
4:46
amazon?
4:47
Javascript has a feature for this too
4:49
called XMLHttpRequest. It lets us send
4:52
a message, in this case we're going to
4:54
send our amazon order, to a url like
4:57
amazon.com/
4:58
create-order. On the other side, amazon's
5:01
backend is listening for these messages
5:04
sent to this url and that's how they get
5:06
our order. We're going to talk more about
5:08
this process in our backend video that
5:10
you can find in the description.
5:12
Over the years we've improved on
5:14
XMLHttpRequest and these days we use tools
5:17
like axios or fetch to send messages to
5:20
the backend.
Review & conclusion
5:22
Alright, so these are all the
5:23
technologies we need to build the frontend.
5:25
You'll notice that it's really just
5:27
html, css, and javascript. The other
5:30
technologies make css and javascript
5:33
easier to work with. Let me know in the
5:35
comments how many of these technologies
5:37
you already knew, and if anything was new
5:39
to you. Thanks for watching, my name is
5:40
simon from supersimple.dev I want to
5:42
make a tech career possible for anyone.
5:45
You can find my contact info in the
5:46
description, and I'll see you in the next
5:48
one.
