<svelte:head>
    <title>About - OPML Editor</title>
</svelte:head>

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
&lt;?xml version=&quot;1.0&quot; encoding=&quot;ISO-8859-1&quot;?&gt;
&lt;opml version=&quot;2.0&quot;&gt;
    &lt;head&gt;
        &lt;title&gt;mySubscriptions.opml&lt;/title&gt;
        &lt;dateCreated&gt;Sat, 18 Jun 2005 12:11:52 GMT&lt;/dateCreated&gt;
        &lt;dateModified&gt;Tue, 02 Aug 2005 21:42:48 GMT&lt;/dateModified&gt;
        &lt;ownerName&gt;Dave Winer&lt;/ownerName&gt;
        &lt;ownerEmail&gt;dave@scripting.com&lt;/ownerEmail&gt;
        &lt;expansionState&gt;&lt;/expansionState&gt;
        &lt;vertScrollState&gt;1&lt;/vertScrollState&gt;
        &lt;windowTop&gt;61&lt;/windowTop&gt;
        &lt;windowLeft&gt;304&lt;/windowLeft&gt;
        &lt;windowBottom&gt;562&lt;/windowBottom&gt;
        &lt;windowRight&gt;842&lt;/windowRight&gt;
    &lt;/head&gt;
    &lt;body&gt;
        &lt;outline text=&quot;CNET News.com&quot; description=&quot;Tech news and business reports by CNET News.com. Focused on information technology, core topics include computers, hardware, software, networking, and Internet media.&quot; htmlUrl=&quot;http://news.com.com/&quot; language=&quot;unknown&quot; title=&quot;CNET News.com&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://news.com.com/2547-1_3-0-5.xml&quot;/&gt;
        &lt;outline text=&quot;washingtonpost.com - Politics&quot; description=&quot;Politics&quot; htmlUrl=&quot;http://www.washingtonpost.com/wp-dyn/politics?nav=rss_politics&quot; language=&quot;unknown&quot; title=&quot;washingtonpost.com - Politics&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://www.washingtonpost.com/wp-srv/politics/rssheadlines.xml&quot;/&gt;
        &lt;outline text=&quot;Scobleizer: Microsoft Geek Blogger&quot; description=&quot;Robert Scoble&#39;s look at geek and Microsoft life.&quot; htmlUrl=&quot;http://radio.weblogs.com/0001011/&quot; language=&quot;unknown&quot; title=&quot;Scobleizer: Microsoft Geek Blogger&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://radio.weblogs.com/0001011/rss.xml&quot;/&gt;
        &lt;outline text=&quot;Yahoo! News: Technology&quot; description=&quot;Technology&quot; htmlUrl=&quot;http://news.yahoo.com/news?tmpl=index&amp;amp;cid=738&quot; language=&quot;unknown&quot; title=&quot;Yahoo! News: Technology&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://rss.news.yahoo.com/rss/tech&quot;/&gt;
        &lt;outline text=&quot;Workbench&quot; description=&quot;Programming and publishing news and comment&quot; htmlUrl=&quot;http://www.cadenhead.org/workbench/&quot; language=&quot;unknown&quot; title=&quot;Workbench&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://www.cadenhead.org/workbench/rss.xml&quot;/&gt;
        &lt;outline text=&quot;Christian Science Monitor | Top Stories&quot; description=&quot;Read the front page stories of csmonitor.com.&quot; htmlUrl=&quot;http://csmonitor.com&quot; language=&quot;unknown&quot; title=&quot;Christian Science Monitor | Top Stories&quot; type=&quot;rss&quot; version=&quot;RSS&quot; xmlUrl=&quot;http://www.csmonitor.com/rss/top.rss&quot;/&gt;
        &lt;outline text=&quot;Dictionary.com Word of the Day&quot; description=&quot;A new word is presented every day with its definition and example sentences from actual published works.&quot; htmlUrl=&quot;http://dictionary.reference.com/wordoftheday/&quot; language=&quot;unknown&quot; title=&quot;Dictionary.com Word of the Day&quot; type=&quot;rss&quot; version=&quot;RSS&quot; xmlUrl=&quot;http://www.dictionary.com/wordoftheday/wotd.rss&quot;/&gt;
        &lt;outline text=&quot;The Motley Fool&quot; description=&quot;To Educate, Amuse, and Enrich&quot; htmlUrl=&quot;http://www.fool.com&quot; language=&quot;unknown&quot; title=&quot;The Motley Fool&quot; type=&quot;rss&quot; version=&quot;RSS&quot; xmlUrl=&quot;http://www.fool.com/xml/foolnews_rss091.xml&quot;/&gt;
        &lt;outline text=&quot;InfoWorld: Top News&quot; description=&quot;The latest on Top News from InfoWorld&quot; htmlUrl=&quot;http://www.infoworld.com/news/index.html&quot; language=&quot;unknown&quot; title=&quot;InfoWorld: Top News&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://www.infoworld.com/rss/news.xml&quot;/&gt;
        &lt;outline text=&quot;NYT &amp;gt; Business&quot; description=&quot;Find breaking news &amp;amp; business news on Wall Street, media &amp;amp; advertising, international business, banking, interest rates, the stock market, currencies &amp;amp; funds.&quot; htmlUrl=&quot;http://www.nytimes.com/pages/business/index.html?partner=rssnyt&quot; language=&quot;unknown&quot; title=&quot;NYT &amp;gt; Business&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://www.nytimes.com/services/xml/rss/nyt/Business.xml&quot;/&gt;
        &lt;outline text=&quot;NYT &amp;gt; Technology&quot; description=&quot;&quot; htmlUrl=&quot;http://www.nytimes.com/pages/technology/index.html?partner=rssnyt&quot; language=&quot;unknown&quot; title=&quot;NYT &amp;gt; Technology&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://www.nytimes.com/services/xml/rss/nyt/Technology.xml&quot;/&gt;
        &lt;outline text=&quot;Scripting News&quot; description=&quot;It&#39;s even worse than it appears.&quot; htmlUrl=&quot;http://www.scripting.com/&quot; language=&quot;unknown&quot; title=&quot;Scripting News&quot; type=&quot;rss&quot; version=&quot;RSS2&quot; xmlUrl=&quot;http://www.scripting.com/rss.xml&quot;/&gt;
        &lt;outline text=&quot;Wired News&quot; description=&quot;Technology, and the way we do business, is changing the world we know. Wired News is a technology - and business-oriented news service feeding an intelligent, discerning audience. What role does technology play in the day-to-day living of your life? Wired News tells you. How has evolving technology changed the face of the international business world? Wired News puts you in the picture.&quot; htmlUrl=&quot;http://www.wired.com/&quot; language=&quot;unknown&quot; title=&quot;Wired News&quot; type=&quot;rss&quot; version=&quot;RSS&quot; xmlUrl=&quot;http://www.wired.com/news_drop/netcenter/netcenter.rdf&quot;/&gt;
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