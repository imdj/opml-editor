<h1>About</h1>

<h2>About the editor</h2>
<p>
    OPML is based around the concept of an "outline", a hierarchical structure that can represent a wide variety of information. Editors built around this structure are often called "outliners".
    <br>
    Although this editor fully support the OPML specification, it's more tailored for managing RSS/Atom feed lists specifically as a supplement to feed readers.
</p>

Why?
<br>
OPML is a great way to manage and share feed lists. It's simple and widely supported by many feed readers.
But often you find that feed readers are a bit rigid, and on the other hand, the files are too large and cubersome to manually edit in a standard text editor.
So that's where this editor comes in, it's a simple tool to help you manage your feed lists in a more flexible way. It's tailored for this specific use case and committed to make it as smooth as possible.

<h2>About OPML</h2>
<p>
    OPML (Outline Processor Markup Language) is a simple XML-based file format that is commonly used to structure and exchange hierarchical lists of information (outlines) between applications. The outline format is versatile and can be used to represent a wide variety of hierarchical information, including bookmarks, notes, to-do lists, project plans, and RSS/Atom feeds.
</p>

<h2>OPML Specification</h2>
<p>
    It was developed by <a href="https://davewiner.com/">Dave Winer</a>. The first version (1.0) was released in 2000. The current version is 2.0, released in 2007.
</p>
<p>
    The OPML 2.0 specification is available at <a href="https://opml.org/spec2.opml">https://opml.org/spec2.opml</a>
</p>

<h2>Basic example</h2>
<pre class="overflow-auto bg-gray-200 p-4 rounded-md">
    &lt;?xml version="1.0" encoding="ISO-8859-1"?&gt;
    &lt;opml version="2.0"&gt;
        &lt;head&gt;
            &lt;title&gt;Example OPML&lt;/title&gt;
        &lt;/head&gt;
        &lt;body&gt;
            &lt;outline text="Example Outline" title="Example Outline"&gt;
                &lt;outline text="Item 1" title="Item 1" xmlUrl="http://example.com/rss.xml" htmlUrl="http://example.com/"&gt;
                &lt;outline text="Item 2" title="Item 2" xmlUrl="http://example.com/rss.xml" htmlUrl="http://example.com/"&gt;
                &lt;outline text="Item 3" title="Item 3" xmlUrl="http://example.com/rss.xml" htmlUrl="http://example.com/"&gt;
            &lt;/outline&gt;
        &lt;/body&gt;
    &lt;/opml&gt;
</pre>

<style>
    ul {
        @apply list-disc list-inside;
    }

    ul li a {
        @apply break-all;
    }

    p {
        @apply mb-4;
    }
</style>