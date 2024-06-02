<h1>About OPML</h1>

<p>
    OPML (Outline Processor Markup Language) is a simple XML-based file format mainly used for syndication feedlists and exchanging subscriptions between feed readers and aggregators.
</p>

<h2>Specification</h2>
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

<h2>More examples</h2>
<ul>
    <li><a href="http://hosting.opml.org/dave/spec/subscriptionList.opml" target="_blank" rel="nofollow noreferrer">https://hosting.opml.org/dave/spec/subscriptionList.opml#</a></li>
    <li><a href="http://hosting.opml.org/dave/spec/states.opml" target="_blank" rel="nofollow noreferrer">https://hosting.opml.org/dave/spec/states.opml#</a></li>
    <li><a href="http://hosting.opml.org/dave/spec/simpleScript.opml" target="_blank" rel="nofollow noreferrer">https://hosting.opml.org/dave/spec/simpleScript.opml#</a></li>
    <li><a href="http://hosting.opml.org/dave/spec/placesLived.opml" target="_blank" rel="nofollow noreferrer">https://hosting.opml.org/dave/spec/placesLived.opml#</a></li>
    <li><a href="http://hosting.opml.org/dave/spec/directory.opml" target="_blank" rel="nofollow noreferrer">https://hosting.opml.org/dave/spec/directory.opml#</a></li>
    <li><a href="http://hosting.opml.org/dave/spec/category.opml" target="_blank" rel="nofollow noreferrer">https://hosting.opml.org/dave/spec/category.opml#</a></li>
</ul>

<style>
    ul {
        @apply list-disc list-inside;
    }

    ul li a {
        @apply break-all;
    }
</style>