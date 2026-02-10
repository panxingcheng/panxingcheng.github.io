import{_ as a,c as n,o as p,ag as i}from"./chunks/framework.BPIbAgMo.js";const u=JSON.parse('{"title":"Redis","description":"","frontmatter":{"title":"Redis","permalink":"1666920039.html","sidebar":"auto","blogs":"Linux","date":"2022-10-28"},"headers":[],"relativePath":"category/linux/Redis.md","filePath":"category/linux/Redis.md","lastUpdated":1714213745000}'),e={name:"category/linux/Redis.md"};function l(t,s,o,h,c,d){return p(),n("div",null,s[0]||(s[0]=[i(`<h1 id="redis" tabindex="-1">Redis <a class="header-anchor" href="#redis" aria-label="Permalink to &quot;Redis&quot;">​</a></h1><p><a href="https://redis.io/" target="_blank" rel="noreferrer">Redis</a>是一个开源(BSD许可)的内存数据结构存储，用作数据库、缓存、消息代理和流引擎等。</p><h2 id="连接管理" tabindex="-1">连接管理 <a class="header-anchor" href="#连接管理" aria-label="Permalink to &quot;连接管理&quot;">​</a></h2><h3 id="select-切换至指定的数据库" tabindex="-1">SELECT：切换至指定的数据库 <a class="header-anchor" href="#select-切换至指定的数据库" aria-label="Permalink to &quot;SELECT：切换至指定的数据库&quot;">​</a></h3><ul><li>语法：<code>SELECT index</code></li></ul><p>选择具有指定的从零开始的数字索引的Redis逻辑数据库。新的连接总是使用数据库0。</p><p>可选择的Redis数据库是命名空间的一种形式:所有的数据库仍然保存在同一个RDB / AOF文件中。然而，不同的数据库可以有相同名称的键，像FLUSHDB、SWAPDB或RANDOMKEY这样的命令可以在特定的数据库上工作。</p><p>实际上，Redis数据库应该用于分离属于同一个应用程序的不同键(如果需要的话)，而不是将一个Redis实例用于多个不相关的应用程序。</p><p>当使用Redis集群时，不能使用SELECT命令，因为Redis集群只支持数据库0。在Redis集群的情况下，拥有多个数据库将是无用的和不必要的复杂性的来源。对于Redis集群的设计和目标来说，在单个数据库上原子地运行命令是不可能的。</p><p>由于当前选择的数据库是连接的一个属性，因此客户端应该跟踪当前选择的数据库，并在重新连接时重新选择它。虽然没有命令用于查询当前连接中所选的数据库，但CLIENT LIST输出为每个客户机显示当前所选的数据库。</p><ul><li><p>返回</p><p>简单字符串回复</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SELECT 1</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>[1]&gt; SELECT 0</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; SELECT 16</span></span>
<span class="line"><span>(error) ERR DB index is out of range</span></span>
<span class="line"><span>&gt; SELECT 15</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>[15]&gt; SELECT 0</span></span>
<span class="line"><span>OK</span></span></code></pre></div><h2 id="服务管理" tabindex="-1">服务管理 <a class="header-anchor" href="#服务管理" aria-label="Permalink to &quot;服务管理&quot;">​</a></h2><h3 id="shutdown-关闭服务器" tabindex="-1">SHUTDOWN：关闭服务器 <a class="header-anchor" href="#shutdown-关闭服务器" aria-label="Permalink to &quot;SHUTDOWN：关闭服务器&quot;">​</a></h3><ul><li>语法：<code>SHUTDOWN [NOSAVE | SAVE] [NOW] [FORCE] [ABORT]</code></li></ul><p>关闭服务器。</p><h2 id="通用" tabindex="-1">通用 <a class="header-anchor" href="#通用" aria-label="Permalink to &quot;通用&quot;">​</a></h2><h3 id="keys-获取所有与给定匹配符相匹配的键" tabindex="-1">KEYS：获取所有与给定匹配符相匹配的键 <a class="header-anchor" href="#keys-获取所有与给定匹配符相匹配的键" aria-label="Permalink to &quot;KEYS：获取所有与给定匹配符相匹配的键&quot;">​</a></h3><ul><li>语法：<code>KEYS pattern</code></li></ul><p>返回所有匹配模式的键。</p><p>虽然该操作的时间复杂度为O(N)，但常数时间相当低。例如，在入门级笔记本电脑上运行的Redis可以在40毫秒内扫描100万个密钥的数据库。</p><p>警告:将KEYS视为只应在生产环境中极其小心地使用的命令。当它针对大型数据库执行时，可能会破坏性能。此命令用于调试和特殊操作，例如更改密钥空间布局。不要在常规应用程序代码中使用key。如果正在寻找在键空间子集中查找键的方法，请考虑使用SCAN或sets。</p><p>支持的全局样式模式:</p><ul><li><p>h?llo 匹配 hello, hallo 和 hxllo</p></li><li><p>h*llo 匹配 hllo 和 heeeello</p></li><li><p>h[ae]llo 可以匹配 hello 和 hallo, 但不能匹配 hillo</p></li><li><p>h[^e]llo 可以匹配 hallo, hbllo, ... 但不能匹配 hello</p></li><li><p>h[a-b]llo 匹配 hallo 和 hbllo</p></li></ul><p>如果你想逐字匹配特殊字符，使用<code>\\</code>来转义。</p><h4 id="返回值" tabindex="-1">返回值 <a class="header-anchor" href="#返回值" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p>数组回复:匹配模式的键列表。</p><h4 id="示例" tabindex="-1">示例 <a class="header-anchor" href="#示例" aria-label="Permalink to &quot;示例&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; MSET firstname Jack lastname Stuntman age 35</span></span>
<span class="line"><span>&quot;OK&quot;</span></span>
<span class="line"><span>&gt; KEYS *name*</span></span>
<span class="line"><span>1) &quot;lastname&quot;</span></span>
<span class="line"><span>2) &quot;firstname&quot;</span></span>
<span class="line"><span>&gt; KEYS a??</span></span>
<span class="line"><span>1) &quot;age&quot;</span></span>
<span class="line"><span>&gt; KEYS *</span></span>
<span class="line"><span>1) &quot;age&quot;</span></span>
<span class="line"><span>2) &quot;lastname&quot;</span></span>
<span class="line"><span>3) &quot;firstname&quot;</span></span></code></pre></div><h3 id="scan-以增量方式迭代数据库中的键" tabindex="-1">SCAN：以增量方式迭代数据库中的键 <a class="header-anchor" href="#scan-以增量方式迭代数据库中的键" aria-label="Permalink to &quot;SCAN：以增量方式迭代数据库中的键&quot;">​</a></h3><ul><li>语法：<code>SCAN cursor [MATCH pattern] [COUNT count] [TYPE type]</code></li></ul><p>使用SCAN命令和密切相关的命令SSCAN、HSCAN和ZSCAN对元素集合进行增量迭代。</p><ul><li>SCAN迭代当前选择的Redis数据库中的键集。</li><li>SSCAN迭代集合类型的元素。</li><li>HSCAN迭代哈希类型的字段及其相关值。</li><li>ZSCAN迭代排序集类型的元素及其相关的分数。</li></ul><p>由于这些命令允许增量迭代，每次调用只返回少量的元素，因此可以在生产中使用它们，而不需要像KEYS或members这样的命令，这些命令在针对大量键或元素集合调用时可能会阻塞服务器很长时间(甚至几秒钟)。</p><p>然而，虽然像members这样的阻塞命令能够在给定时刻提供作为Set一部分的所有元素，但SCAN命令家族只能对返回的元素提供有限的保证，因为我们增量迭代的集合可能在迭代过程中发生变化。</p><p>请注意，SCAN、SCAN、HSCAN和ZSCAN的工作原理非常相似，因此本文档涵盖了所有四个命令。然而，一个明显的区别是，在SSCAN, HSCAN和ZSCAN的情况下，第一个参数是持有Set, Hash或Sorted Set值的键的名称。SCAN命令在迭代当前数据库中的键时不需要任何键名参数，因此被迭代的对象是数据库本身。</p><h4 id="scan基本用法" tabindex="-1">SCAN基本用法 <a class="header-anchor" href="#scan基本用法" aria-label="Permalink to &quot;SCAN基本用法&quot;">​</a></h4><p>SCAN是一个基于游标的迭代器。这意味着在每次调用该命令时，服务器都会返回一个更新后的游标，用户需要在下次调用中使用它作为游标参数。</p><p>当游标设置为0时，迭代开始，当服务器返回的游标为0时，迭代结束。下面是一个SCAN迭代的例子:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; MSET 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 12 12 13 13 14 14 15 15 16 16 17 17 18 18 19 19</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; SCAN 0</span></span>
<span class="line"><span>1) &quot;25&quot;</span></span>
<span class="line"><span>2)  1) &quot;19&quot;</span></span>
<span class="line"><span>    2) &quot;9&quot;</span></span>
<span class="line"><span>    3) &quot;13&quot;</span></span>
<span class="line"><span>    4) &quot;6&quot;</span></span>
<span class="line"><span>    5) &quot;4&quot;</span></span>
<span class="line"><span>    6) &quot;12&quot;</span></span>
<span class="line"><span>    7) &quot;10&quot;</span></span>
<span class="line"><span>    8) &quot;1&quot;</span></span>
<span class="line"><span>    9) &quot;8&quot;</span></span>
<span class="line"><span>   10) &quot;15&quot;</span></span>
<span class="line"><span>   11) &quot;16&quot;</span></span>
<span class="line"><span>   12) &quot;17&quot;</span></span>
<span class="line"><span>&gt; SCAN 25</span></span>
<span class="line"><span>1) &quot;0&quot;</span></span>
<span class="line"><span>2) 1) &quot;11&quot;</span></span>
<span class="line"><span>   2) &quot;7&quot;</span></span>
<span class="line"><span>   3) &quot;2&quot;</span></span>
<span class="line"><span>   4) &quot;3&quot;</span></span>
<span class="line"><span>   5) &quot;14&quot;</span></span>
<span class="line"><span>   6) &quot;18&quot;</span></span>
<span class="line"><span>   7) &quot;5&quot;</span></span></code></pre></div><p>正如您所看到的，SCAN返回值是一个包含两个值的数组:第一个值是在下一次调用中使用的新游标，第二个值是一个元素数组。</p><p>由于在第二个调用中返回的游标为0，所以服务器向调用者发出迭代结束的信号，集合已被完全探索。以游标值为0开始迭代，并调用SCAN直到返回的游标再次为0，这称为完整迭代。</p><h4 id="迭代保证" tabindex="-1">迭代保证 <a class="header-anchor" href="#迭代保证" aria-label="Permalink to &quot;迭代保证&quot;">​</a></h4><p>针对数据库的一次完整迭代（full iteration）以用户给定游标0调用SCAN 命令开始，直到SCAN命令返回游标0结束。SCAN命令为完整迭代提供 以下保证：</p><ul><li>从迭代开始到迭代结束的整个过程中，一直存在于数据库中的键总会 被返回。</li><li>如果一个键在迭代的过程中被添加到数据库中，那么这个键是否会被 返回是不确定的。</li><li>如果一个键在迭代的过程中被移除了，那么SCAN命令在它被移除之后 将不再返回这个键，但是这个键在被移除之前仍然有可能被SCAN命令 返回。</li><li>无论数据库如何变化，迭代总是有始有终的，不会出现循环迭代或者 其他无法终止迭代的情况。</li></ul><h4 id="返回值-1" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-1" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p>SCAN、SSCAN、HSCAN和ZSCAN返回一个包含两个元素的多批量应答，其中第一个元素是一个表示无符号64位数字(游标)的字符串，第二个元素是一个包含元素数组的多批量应答。</p><ul><li>SCAN的元素数组是键的列表。</li><li>SSCAN的元素数组是Set成员的列表。</li><li>HSCAN的元素数组包含两个元素，一个字段和一个值，用于Hash的每个返回元素。</li><li>对于排序集的每个返回元素，ZSCAN元素数组包含两个元素，一个成员及其关联的分数。</li></ul><h4 id="示例-1" tabindex="-1">示例 <a class="header-anchor" href="#示例-1" aria-label="Permalink to &quot;示例&quot;">​</a></h4><h5 id="scan" tabindex="-1">SCAN <a class="header-anchor" href="#scan" aria-label="Permalink to &quot;SCAN&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; MSET 1 1 2 2 3 3 4 4 5 5 6 6 7 7 8 8 9 9 10 10 11 11 12 12 13 13 14 14 15 15 16 16 17 17 18 18 19 19</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; SCAN 0 match 1* count 5</span></span>
<span class="line"><span>1) &quot;26&quot;</span></span>
<span class="line"><span>2) 1) &quot;14&quot;</span></span>
<span class="line"><span>   2) &quot;16&quot;</span></span>
<span class="line"><span>   3) &quot;10&quot;</span></span>
<span class="line"><span>   4) &quot;19&quot;</span></span>
<span class="line"><span>&gt; SCAN 26 match 1* count 5</span></span>
<span class="line"><span>1) &quot;21&quot;</span></span>
<span class="line"><span>2) 1) &quot;13&quot;</span></span>
<span class="line"><span>   2) &quot;18&quot;</span></span>
<span class="line"><span>&gt; SCAN 21 match 1* count 5</span></span>
<span class="line"><span>1) &quot;27&quot;</span></span>
<span class="line"><span>2) 1) &quot;11&quot;</span></span>
<span class="line"><span>   2) &quot;15&quot;</span></span>
<span class="line"><span>   3) &quot;17&quot;</span></span>
<span class="line"><span>   4) &quot;1&quot;</span></span>
<span class="line"><span>   5) &quot;12&quot;</span></span>
<span class="line"><span>&gt; SCAN 27 match 1* count 5</span></span>
<span class="line"><span>1) &quot;0&quot;</span></span>
<span class="line"><span>2) (empty array)</span></span></code></pre></div><h5 id="sscan" tabindex="-1">SSCAN <a class="header-anchor" href="#sscan" aria-label="Permalink to &quot;SSCAN&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset 1 2 3 4 5 6 7 8 9</span></span>
<span class="line"><span>(integer) 9</span></span>
<span class="line"><span>&gt; SSCAN myset 0</span></span>
<span class="line"><span>1) &quot;0&quot;</span></span>
<span class="line"><span>2) 1) &quot;1&quot;</span></span>
<span class="line"><span>   2) &quot;2&quot;</span></span>
<span class="line"><span>   3) &quot;3&quot;</span></span>
<span class="line"><span>   4) &quot;4&quot;</span></span>
<span class="line"><span>   5) &quot;5&quot;</span></span>
<span class="line"><span>   6) &quot;6&quot;</span></span>
<span class="line"><span>   7) &quot;7&quot;</span></span>
<span class="line"><span>   8) &quot;8&quot;</span></span>
<span class="line"><span>   9) &quot;9&quot;</span></span></code></pre></div><h5 id="hscan" tabindex="-1">HSCAN <a class="header-anchor" href="#hscan" aria-label="Permalink to &quot;HSCAN&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash a 1 b 2 c 3 d 4 e 5 f 6 g 7 h 8 i 9</span></span>
<span class="line"><span>(integer) 9</span></span>
<span class="line"><span>&gt; HSCAN myhash 0</span></span>
<span class="line"><span>1) &quot;0&quot;</span></span>
<span class="line"><span>2)  1) &quot;a&quot;</span></span>
<span class="line"><span>    2) &quot;1&quot;</span></span>
<span class="line"><span>    3) &quot;b&quot;</span></span>
<span class="line"><span>    4) &quot;2&quot;</span></span>
<span class="line"><span>    5) &quot;c&quot;</span></span>
<span class="line"><span>    6) &quot;3&quot;</span></span>
<span class="line"><span>    7) &quot;d&quot;</span></span>
<span class="line"><span>    8) &quot;4&quot;</span></span>
<span class="line"><span>    9) &quot;e&quot;</span></span>
<span class="line"><span>   10) &quot;5&quot;</span></span>
<span class="line"><span>   11) &quot;f&quot;</span></span>
<span class="line"><span>   12) &quot;6&quot;</span></span>
<span class="line"><span>   13) &quot;g&quot;</span></span>
<span class="line"><span>   14) &quot;7&quot;</span></span>
<span class="line"><span>   15) &quot;h&quot;</span></span>
<span class="line"><span>   16) &quot;8&quot;</span></span>
<span class="line"><span>   17) &quot;i&quot;</span></span>
<span class="line"><span>   18) &quot;9&quot;</span></span></code></pre></div><h5 id="zscan" tabindex="-1">ZSCAN <a class="header-anchor" href="#zscan" aria-label="Permalink to &quot;ZSCAN&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 1 one 2 two 3 three 4 four 5 five 6 six 7 seven 8 eight 9 nine</span></span>
<span class="line"><span>(integer) 9</span></span>
<span class="line"><span>&gt; ZSCAN myzset 0</span></span>
<span class="line"><span>1) &quot;0&quot;</span></span>
<span class="line"><span>2)  1) &quot;one&quot;</span></span>
<span class="line"><span>    2) &quot;1&quot;</span></span>
<span class="line"><span>    3) &quot;two&quot;</span></span>
<span class="line"><span>    4) &quot;2&quot;</span></span>
<span class="line"><span>    5) &quot;three&quot;</span></span>
<span class="line"><span>    6) &quot;3&quot;</span></span>
<span class="line"><span>    7) &quot;four&quot;</span></span>
<span class="line"><span>    8) &quot;4&quot;</span></span>
<span class="line"><span>    9) &quot;five&quot;</span></span>
<span class="line"><span>   10) &quot;5&quot;</span></span>
<span class="line"><span>   11) &quot;six&quot;</span></span>
<span class="line"><span>   12) &quot;6&quot;</span></span>
<span class="line"><span>   13) &quot;seven&quot;</span></span>
<span class="line"><span>   14) &quot;7&quot;</span></span>
<span class="line"><span>   15) &quot;eight&quot;</span></span>
<span class="line"><span>   16) &quot;8&quot;</span></span>
<span class="line"><span>   17) &quot;nine&quot;</span></span>
<span class="line"><span>   18) &quot;9&quot;</span></span></code></pre></div><h3 id="sort-对键的值进行排序" tabindex="-1">SORT：对键的值进行排序 <a class="header-anchor" href="#sort-对键的值进行排序" aria-label="Permalink to &quot;SORT：对键的值进行排序&quot;">​</a></h3><ul><li>语法：<code>SORT key [BY pattern] [LIMIT offset count] [GET pattern [GET pattern ...]] [ASC | DESC] [ALPHA] [STORE destination]</code></li></ul><p>返回或存储list、set或sorted set中包含的元素。</p><p>默认情况下，排序是数值的，元素的比较是根据它们的值解释为双精度浮点数。这是SORT最简单的形式:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SORT mylist</span></span></code></pre></div><p>假设mylist是一个数字列表，该命令将返回元素从小到大排序的相同列表。为了将数字从大到小排序，使用DESC修饰符:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SORT mylist DESC</span></span></code></pre></div><p>当mylist包含字符串值并希望按字典顺序排序时，请使用ALPHA修饰符:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SORT mylist ALPHA</span></span></code></pre></div><p>可以使用LIMIT修饰符限制返回元素的数量。此修饰符接受offset参数(指定要跳过的元素数量)和count参数(指定从offset开始返回的元素数量)。下面的例子将返回10个mylist的排序版本的元素，从元素0开始(偏移量从零开始):</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SORT mylist LIMIT 0 10</span></span></code></pre></div><p>几乎所有的修饰语都可以一起使用。下面的示例将返回前5个元素，按字典顺序降序排序:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SORT mylist LIMIT 0 5 ALPHA DESC</span></span></code></pre></div><h4 id="示例-2" tabindex="-1">示例 <a class="header-anchor" href="#示例-2" aria-label="Permalink to &quot;示例&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset xiaomi huawei apple vivo oppo</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; SMEMBERS myset</span></span>
<span class="line"><span>1) &quot;vivo&quot;</span></span>
<span class="line"><span>2) &quot;apple&quot;</span></span>
<span class="line"><span>3) &quot;huawei&quot;</span></span>
<span class="line"><span>4) &quot;xiaomi&quot;</span></span>
<span class="line"><span>5) &quot;oppo&quot;</span></span>
<span class="line"><span>&gt; SORT myset</span></span>
<span class="line"><span>(error) ERR One or more scores can&#39;t be converted into double</span></span>
<span class="line"><span>&gt; SORT myset alpha</span></span>
<span class="line"><span>1) &quot;apple&quot;</span></span>
<span class="line"><span>2) &quot;huawei&quot;</span></span>
<span class="line"><span>3) &quot;oppo&quot;</span></span>
<span class="line"><span>4) &quot;vivo&quot;</span></span>
<span class="line"><span>5) &quot;xiaomi&quot;</span></span></code></pre></div><h2 id="数据类型" tabindex="-1">数据类型 <a class="header-anchor" href="#数据类型" aria-label="Permalink to &quot;数据类型&quot;">​</a></h2><h3 id="strings-字符串" tabindex="-1">Strings（字符串） <a class="header-anchor" href="#strings-字符串" aria-label="Permalink to &quot;Strings（字符串）&quot;">​</a></h3><p>Redis strings存储字节序列，包括文本、序列化对象和二进制数组。因此，strings是最基本的Redis数据类型。</p><h4 id="set-设置string" tabindex="-1">SET：设置string <a class="header-anchor" href="#set-设置string" aria-label="Permalink to &quot;SET：设置string&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey somevalue</span></span>
<span class="line"><span>OK</span></span></code></pre></div><p><code>SET</code>默认会覆盖已有键的值：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey somevalue</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; SET mykey newvalue</span></span>
<span class="line"><span>OK</span></span></code></pre></div><p>从Redis 2.6.12版本开始，用户可以通过向<code>SET</code>命令提供可选的<code>NX</code>选项 或者<code>XX</code>选项来指示<code>SET</code>命令是否要覆盖一个已经存在的值：</p><ul><li><p>NX — 只在键不存在的情况下设置键</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey somevalue</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; SET mykey newvalue NX</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; SET newkey somevalue NX</span></span>
<span class="line"><span>OK</span></span></code></pre></div></li><li><p>XX — 只设置已经存在的键</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey somevalue</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; SET mykey newvalue XX</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; SET mykey1 somevalue XX</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div></li></ul><h4 id="get-获取string" tabindex="-1">GET：获取string <a class="header-anchor" href="#get-获取string" aria-label="Permalink to &quot;GET：获取string&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey somevalue</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;somevalue&quot;</span></span>
<span class="line"><span>&gt; GET mykey1</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div><h4 id="getset-获取旧string并设置新string" tabindex="-1">GETSET：获取旧string并设置新string <a class="header-anchor" href="#getset-获取旧string并设置新string" aria-label="Permalink to &quot;GETSET：获取旧string并设置新string&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey somevalue</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;somevalue&quot;</span></span>
<span class="line"><span>&gt; GETSET mykey newvalue</span></span>
<span class="line"><span>&quot;somevalue&quot;</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;newvalue&quot;</span></span></code></pre></div><p>如果被设置的键并不存在于数据库，那么<code>GETSET</code>命令将返回空值作为键的旧值：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; GETSET mykey1 somevalue</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; GET mykey1</span></span>
<span class="line"><span>&quot;somevalue&quot;</span></span></code></pre></div><h4 id="mset-一次为多个键设置string" tabindex="-1">MSET：一次为多个键设置string <a class="header-anchor" href="#mset-一次为多个键设置string" aria-label="Permalink to &quot;MSET：一次为多个键设置string&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; MSET a 10 b 20 c 30</span></span>
<span class="line"><span>OK</span></span></code></pre></div><h4 id="mget-一次获取多个键的string" tabindex="-1">MGET：一次获取多个键的string <a class="header-anchor" href="#mget-一次获取多个键的string" aria-label="Permalink to &quot;MGET：一次获取多个键的string&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; MGET a b c</span></span>
<span class="line"><span>1) &quot;10&quot;</span></span>
<span class="line"><span>2) &quot;20&quot;</span></span>
<span class="line"><span>3) &quot;30&quot;</span></span></code></pre></div><h4 id="msetnx-只在键都不存在的情况下-一次为多个键设置string" tabindex="-1">MSETNX：只在键都不存在的情况下，一次为多个键设置string <a class="header-anchor" href="#msetnx-只在键都不存在的情况下-一次为多个键设置string" aria-label="Permalink to &quot;MSETNX：只在键都不存在的情况下，一次为多个键设置string&quot;">​</a></h4><p>将给定的键设置为它们各自的值。即使只有一个键已经存在，<code>MSETNX</code>也不会执行任何操作。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; MSET a 10 b 20 c 30</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; MSETNX c 10 d 20</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; MSETNX d 10 e 20 f 30</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre></div><h4 id="strlen-获取string的长度" tabindex="-1">STRLEN：获取string的长度 <a class="header-anchor" href="#strlen-获取string的长度" aria-label="Permalink to &quot;STRLEN：获取string的长度&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey somevalue</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;somevalue&quot;</span></span>
<span class="line"><span>&gt; STRLEN mykey</span></span>
<span class="line"><span>(integer) 9</span></span>
<span class="line"><span>&gt; GET mykey1</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; STRLEN mykey1</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="getrange-获取指定索引范围的string" tabindex="-1">GETRANGE：获取指定索引范围的string <a class="header-anchor" href="#getrange-获取指定索引范围的string" aria-label="Permalink to &quot;GETRANGE：获取指定索引范围的string&quot;">​</a></h4><p>返回存储在key处的字符串值的子字符串，由偏移量start和end确定(两者都包含在内)。可以使用负偏移量来提供从字符串末尾开始的偏移量。-1表示最后一个字符，-2表示倒数第二个字符，以此类推。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey &quot;helloworld.study&quot;</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; GETRANGE mykey 0 4</span></span>
<span class="line"><span>&quot;hello&quot;</span></span>
<span class="line"><span>&gt; GETRANGE mykey -5 -1</span></span>
<span class="line"><span>&quot;study&quot;</span></span>
<span class="line"><span>&gt; GETRANGE mykey 0 -1</span></span>
<span class="line"><span>&quot;helloworld.study&quot;</span></span>
<span class="line"><span>&gt; GETRANGE mykey 10 100</span></span>
<span class="line"><span>&quot;.study&quot;</span></span></code></pre></div><h4 id="setrange-设置指定索引范围的string" tabindex="-1">SETRANGE：设置指定索引范围的string <a class="header-anchor" href="#setrange-设置指定索引范围的string" aria-label="Permalink to &quot;SETRANGE：设置指定索引范围的string&quot;">​</a></h4><p>覆盖存储在key处的字符串的一部分，从指定的偏移量开始，覆盖value的整个长度。如果偏移量大于键处字符串的当前长度，则用零字节填充字符串以使偏移量适合。不存在的键被认为是空字符串，因此该命令将确保它持有一个足够大的字符串，以便能够在offset处设置value。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey &quot;hello world&quot;</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; SETRANGE mykey 6 redis</span></span>
<span class="line"><span>(integer) 11</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;hello redis&quot;</span></span></code></pre></div><p>偏移量大于字符串的当前长度，则用零字节填充字符串：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; SETRANGE mykey 5 hello</span></span>
<span class="line"><span>(integer) 10</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;\\x00\\x00\\x00\\x00\\x00hello&quot;</span></span>
<span class="line"><span>&gt; SETRANGE mykey 15 redis</span></span>
<span class="line"><span>(integer) 20</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;\\x00\\x00\\x00\\x00\\x00hello\\x00\\x00\\x00\\x00\\x00redis&quot;</span></span></code></pre></div><h4 id="append-追加新内容到string的末尾" tabindex="-1">APPEND：追加新内容到string的末尾 <a class="header-anchor" href="#append-追加新内容到string的末尾" aria-label="Permalink to &quot;APPEND：追加新内容到string的末尾&quot;">​</a></h4><p>如果key已经存在并且是一个字符串，该命令将在字符串的末尾追加该值。如果key不存在，则创建它并将其设置为空字符串，因此在此特殊情况下<code>APPEND</code>将类似于<code>SET</code>。</p><p><code>APPEND</code>命令从Redis 2.0.0开始可用。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; APPEND mykey hello</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; APPEND mykey &quot; world&quot;</span></span>
<span class="line"><span>(integer) 11</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;hello world&quot;</span></span></code></pre></div><h4 id="incr、decr-对整数值执行加1操作和减1操作" tabindex="-1">INCR、DECR：对整数值执行加1操作和减1操作 <a class="header-anchor" href="#incr、decr-对整数值执行加1操作和减1操作" aria-label="Permalink to &quot;INCR、DECR：对整数值执行加1操作和减1操作&quot;">​</a></h4><h5 id="incr" tabindex="-1">INCR <a class="header-anchor" href="#incr" aria-label="Permalink to &quot;INCR&quot;">​</a></h5><p>将键上存储的数字增加1。如果该密钥不存在，则在执行该操作前将其设置为0。如果键包含错误类型的值或包含不能用整数表示的字符串，则返回错误。此操作仅限于64位有符号整数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey 10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCR mykey</span></span>
<span class="line"><span>(integer) 11</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;11&quot;</span></span>
<span class="line"><span>&gt; SET mykey 10.5</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCR mykey</span></span>
<span class="line"><span>(error) ERR value is not an integer or out of range</span></span>
<span class="line"><span>&gt; SET mykey -10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCR mykey</span></span>
<span class="line"><span>(integer) -9</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;-9&quot;</span></span></code></pre></div><h5 id="decr" tabindex="-1">DECR <a class="header-anchor" href="#decr" aria-label="Permalink to &quot;DECR&quot;">​</a></h5><p>将键上存储的数字减1。如果该密钥不存在，则在执行该操作前将其设置为0。如果键包含错误类型的值或包含不能用整数表示的字符串，则返回错误。此操作仅限于64位有符号整数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey 10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; DECR mykey</span></span>
<span class="line"><span>(integer) 9</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;9&quot;</span></span>
<span class="line"><span>&gt; SET mykey 10.5</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; DECR mykey</span></span>
<span class="line"><span>(error) ERR value is not an integer or out of range</span></span>
<span class="line"><span>&gt; SET mykey -10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; DECR mykey</span></span>
<span class="line"><span>(integer) -11</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;-11&quot;</span></span></code></pre></div><h4 id="incrby、decrby-对整数值执行加法操作和减法操作" tabindex="-1">INCRBY、DECRBY：对整数值执行加法操作和减法操作 <a class="header-anchor" href="#incrby、decrby-对整数值执行加法操作和减法操作" aria-label="Permalink to &quot;INCRBY、DECRBY：对整数值执行加法操作和减法操作&quot;">​</a></h4><h5 id="incrby" tabindex="-1">INCRBY <a class="header-anchor" href="#incrby" aria-label="Permalink to &quot;INCRBY&quot;">​</a></h5><p>将键上存储的数字按增量递增。如果该密钥不存在，则在执行该操作前将其设置为0。如果键包含错误类型的值或包含不能用整数表示的字符串，则返回错误。此操作仅限于64位有符号整数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey 10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCRBY mykey 5</span></span>
<span class="line"><span>(integer) 15</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;15&quot;</span></span>
<span class="line"><span>&gt; SET mykey 10.5</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCRBY mykey 5</span></span>
<span class="line"><span>(error) ERR value is not an integer or out of range</span></span>
<span class="line"><span>&gt; SET mykey -10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCRBY mykey 5</span></span>
<span class="line"><span>(integer) -5</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;-5&quot;</span></span></code></pre></div><h5 id="decrby" tabindex="-1">DECRBY <a class="header-anchor" href="#decrby" aria-label="Permalink to &quot;DECRBY&quot;">​</a></h5><p>将键上存储的数字递减。如果该密钥不存在，则在执行该操作前将其设置为0。如果键包含错误类型的值或包含不能用整数表示的字符串，则返回错误。此操作仅限于64位有符号整数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey 10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; DECRBY mykey 5</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;5&quot;</span></span>
<span class="line"><span>&gt; SET mykey 10.5</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; DECRBY mykey 5</span></span>
<span class="line"><span>(error) ERR value is not an integer or out of range</span></span>
<span class="line"><span>&gt; SET mykey -10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; DECRBY mykey 5</span></span>
<span class="line"><span>(integer) -15</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;-15&quot;</span></span></code></pre></div><h4 id="incrbyfloat-对数字值执行浮点数加法操作" tabindex="-1">INCRBYFLOAT：对数字值执行浮点数加法操作 <a class="header-anchor" href="#incrbyfloat-对数字值执行浮点数加法操作" aria-label="Permalink to &quot;INCRBYFLOAT：对数字值执行浮点数加法操作&quot;">​</a></h4><p>对表示存储在键上的浮点数的字符串增加指定的增量。通过使用负增量值，结果是存储在键上的值被减(通过明显的加法属性)。如果该密钥不存在，则在执行该操作前将其设置为0。</p><p>输出的精度固定在小数点后的17位，而不考虑计算的实际内部精度。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey 10</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCRBYFLOAT mykey 5.5</span></span>
<span class="line"><span>&quot;15.5&quot;</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;15.5&quot;</span></span>
<span class="line"><span>&gt; INCRBYFLOAT mykey -5.5</span></span>
<span class="line"><span>&quot;10&quot;</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;10&quot;</span></span></code></pre></div><h3 id="lists-列表" tabindex="-1">Lists（列表） <a class="header-anchor" href="#lists-列表" aria-label="Permalink to &quot;Lists（列表）&quot;">​</a></h3><p>Redis lists是按插入顺序排序的字符串列表。</p><h4 id="lpush、rpush-将元素推入列表左端、右端" tabindex="-1">LPUSH、RPUSH：将元素推入列表左端、右端 <a class="header-anchor" href="#lpush、rpush-将元素推入列表左端、右端" aria-label="Permalink to &quot;LPUSH、RPUSH：将元素推入列表左端、右端&quot;">​</a></h4><h5 id="lpush" tabindex="-1">LPUSH <a class="header-anchor" href="#lpush" aria-label="Permalink to &quot;LPUSH&quot;">​</a></h5><p>将所有指定的值插入存储在key的列表头部。如果key不存在，则在执行push操作之前将其创建为空列表。当键保存的值不是列表时，将返回错误。</p><p>只需在命令末尾指定多个参数，就可以使用单个命令调用推入多个元素。元素依次插入到列表的头部，从最左边的元素到最右边的元素。例如，命令<code>LPUSH mylist a b c</code>将生成一个包含<code>c</code>作为第一个元素，<code>b</code>作为第二个元素，<code>a</code>作为第三个元素的列表。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; LPUSH mylist a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;c&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span>
<span class="line"><span>3) &quot;a&quot;</span></span></code></pre></div><h5 id="rpush" tabindex="-1">RPUSH <a class="header-anchor" href="#rpush" aria-label="Permalink to &quot;RPUSH&quot;">​</a></h5><p>将所有指定的值插入存储在key的列表尾部。如果key不存在，则在执行push操作之前将其创建为空列表。当键保存的值不是列表时，将返回错误。</p><p>只需在命令末尾指定多个参数，就可以使用单个命令调用推入多个元素。元素依次插入到列表的尾部，从最左边的元素到最右边的元素。例如，命令<code>RPUSH mylist a b c</code>将生成一个包含<code>a</code>作为第一个元素，<code>b</code>作为第二个元素，<code>c</code>作为第三个元素的列表。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span>
<span class="line"><span>3) &quot;c&quot;</span></span></code></pre></div><h4 id="lpushx、rpushx-只对已存在的列表执行推入操作" tabindex="-1">LPUSHX、RPUSHX：只对已存在的列表执行推入操作 <a class="header-anchor" href="#lpushx、rpushx-只对已存在的列表执行推入操作" aria-label="Permalink to &quot;LPUSHX、RPUSHX：只对已存在的列表执行推入操作&quot;">​</a></h4><h5 id="lpushx" tabindex="-1">LPUSHX <a class="header-anchor" href="#lpushx" aria-label="Permalink to &quot;LPUSHX&quot;">​</a></h5><p>仅当key已经存在并保存列表时，才在存储在key的列表头部插入指定的值。与<code>LPUSH</code>相反，当key还不存在时，将不执行任何操作。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; LPUSHX mylist b</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; LPUSH mylist a</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; LPUSHX mylist b</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;b&quot;</span></span>
<span class="line"><span>2) &quot;a&quot;</span></span></code></pre></div><h5 id="rpushx" tabindex="-1">RPUSHX <a class="header-anchor" href="#rpushx" aria-label="Permalink to &quot;RPUSHX&quot;">​</a></h5><p>仅当key已经存在并保存列表时，才在存储在key的列表尾部插入指定的值。与<code>RPUSH</code>相反，当key不存在时，将不执行任何操作。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSHX mylist b</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; RPUSH mylist a</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; RPUSHX mylist b</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span></code></pre></div><h4 id="lpop、rpop-弹出列表最左端、最右端的元素" tabindex="-1">LPOP、RPOP：弹出列表最左端、最右端的元素 <a class="header-anchor" href="#lpop、rpop-弹出列表最左端、最右端的元素" aria-label="Permalink to &quot;LPOP、RPOP：弹出列表最左端、最右端的元素&quot;">​</a></h4><h5 id="lpop" tabindex="-1">LPOP <a class="header-anchor" href="#lpop" aria-label="Permalink to &quot;LPOP&quot;">​</a></h5><p>删除并返回存储在key处的列表的第一个元素。</p><p>默认情况下，该命令从列表开始弹出单个元素。当提供可选的<code>count</code>参数时，根据列表的长度，响应将由最多<code>count</code>个元素组成。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist a b c d e</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; LPOP mylist</span></span>
<span class="line"><span>&quot;a&quot;</span></span>
<span class="line"><span>&gt; LPOP mylist 2</span></span>
<span class="line"><span>1) &quot;b&quot;</span></span>
<span class="line"><span>2) &quot;c&quot;</span></span>
<span class="line"><span>&gt; LPOP mylist 2</span></span>
<span class="line"><span>1) &quot;d&quot;</span></span>
<span class="line"><span>2) &quot;e&quot;</span></span>
<span class="line"><span>&gt; LPOP mylist</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div><h5 id="rpop" tabindex="-1">RPOP <a class="header-anchor" href="#rpop" aria-label="Permalink to &quot;RPOP&quot;">​</a></h5><p>删除并返回存储在键处的列表的最后一个元素。 默认情况下，该命令从列表末尾弹出单个元素。当提供可选的<code>count</code>参数时，根据列表的长度，应答将由最多<code>count</code>个元素组成。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; LPUSH mylist a b c d e</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; RPOP mylist</span></span>
<span class="line"><span>&quot;a&quot;</span></span>
<span class="line"><span>&gt; RPOP mylist 2</span></span>
<span class="line"><span>1) &quot;b&quot;</span></span>
<span class="line"><span>2) &quot;c&quot;</span></span>
<span class="line"><span>&gt; RPOP mylist 2</span></span>
<span class="line"><span>1) &quot;d&quot;</span></span>
<span class="line"><span>2) &quot;e&quot;</span></span>
<span class="line"><span>&gt; RPOP mylist</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div><h4 id="lmove-弹出并推入另一个列表" tabindex="-1">LMOVE：弹出并推入另一个列表 <a class="header-anchor" href="#lmove-弹出并推入另一个列表" aria-label="Permalink to &quot;LMOVE：弹出并推入另一个列表&quot;">​</a></h4><p>原子地返回并删除存储在源列表中的第一个/最后一个元素(头/尾取决于wherefrom参数)，并将存储在目标列表中的第一个/最后一个元素(头/尾取决于whereto参数)的元素推入。</p><p>例如:考虑source列表a、b、c，而destination列表x、y、z。执行<code>LMOVE source destination RIGHT LEFT</code>会导致source保存a、b, destination保存c、x、y、z。</p><p>如果source不存在，则返回nil，不执行任何操作。如果source和destination相同，该操作相当于从列表中删除第一个/最后一个元素，并将其作为列表的第一个/最后一个元素推入，因此可以将其视为列表旋转命令(或者如果wherefrom与whereto相同则为无操作)。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist a b c d e</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; LMOVE mylist myanotherlist right left</span></span>
<span class="line"><span>&quot;e&quot;</span></span>
<span class="line"><span>&gt; LMOVE mylist myanotherlist left right</span></span>
<span class="line"><span>&quot;a&quot;</span></span>
<span class="line"><span>&gt; LMOVE mylist myanotherlist right left</span></span>
<span class="line"><span>&quot;d&quot;</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;b&quot;</span></span>
<span class="line"><span>2) &quot;c&quot;</span></span>
<span class="line"><span>&gt; LRANGE myanotherlist 0 -1</span></span>
<span class="line"><span>1) &quot;d&quot;</span></span>
<span class="line"><span>2) &quot;e&quot;</span></span>
<span class="line"><span>3) &quot;a&quot;</span></span></code></pre></div><h4 id="llen-获取列表的长度" tabindex="-1">LLEN：获取列表的长度 <a class="header-anchor" href="#llen-获取列表的长度" aria-label="Permalink to &quot;LLEN：获取列表的长度&quot;">​</a></h4><p>返回存储在key的列表的长度。如果key不存在，则将其解释为空列表并返回0。当存储在key的值不是一个列表时，将返回一个错误。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; LPUSH mylist hello world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; LLEN mylist</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; LLEN myanotherlist</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="lindex-获取指定索引上的元素" tabindex="-1">LINDEX：获取指定索引上的元素 <a class="header-anchor" href="#lindex-获取指定索引上的元素" aria-label="Permalink to &quot;LINDEX：获取指定索引上的元素&quot;">​</a></h4><p>返回存储在key的列表中索引index处的元素。索引是从零开始的，因此0表示第一个元素，1表示第二个元素，以此类推。可以使用负索引指定从列表尾部开始的元素。这里-1表示最后一个元素，-2表示倒数第二个元素，以此类推。</p><p>当存储在key的值不是一个列表时，将返回一个错误。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist hello world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; LINDEX mylist 0</span></span>
<span class="line"><span>&quot;hello&quot;</span></span>
<span class="line"><span>&gt; LINDEX mylist 1</span></span>
<span class="line"><span>&quot;world&quot;</span></span>
<span class="line"><span>&gt; LINDEX mylist 2</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; LINDEX mylist -1</span></span>
<span class="line"><span>&quot;world&quot;</span></span>
<span class="line"><span>&gt; LINDEX mylist -2</span></span>
<span class="line"><span>&quot;hello&quot;</span></span>
<span class="line"><span>&gt; LINDEX mylist -3</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div><h4 id="lrange-获取指定索引范围上的元素" tabindex="-1">LRANGE：获取指定索引范围上的元素 <a class="header-anchor" href="#lrange-获取指定索引范围上的元素" aria-label="Permalink to &quot;LRANGE：获取指定索引范围上的元素&quot;">​</a></h4><p>返回存储在key处的列表的指定元素。偏移量开始（start）和结束（stop）是从零开始的索引，0是列表的第一个元素(列表的头)，1是下一个元素，以此类推。</p><p>这些偏移量也可以是负数，表示从列表末尾开始的偏移量。例如，-1是列表的最后一个元素，-2是倒数第二个元素，依此类推。</p><div class="tip custom-block"><p class="custom-block-title">索引超出范围</p><p>超出范围的索引不会产生错误。如果start大于列表的stop，则返回空列表。如果stop大于列表的实际结束，Redis会将其视为列表的最后一个元素。</p></div><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist one two three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span>
<span class="line"><span>3) &quot;three&quot;</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 0</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>&gt; LRANGE mylist -3 2</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span>
<span class="line"><span>3) &quot;three&quot;</span></span></code></pre></div><h4 id="lset-为指定索引设置新元素" tabindex="-1">LSET：为指定索引设置新元素 <a class="header-anchor" href="#lset-为指定索引设置新元素" aria-label="Permalink to &quot;LSET：为指定索引设置新元素&quot;">​</a></h4><p>将列表元素的index设置为element。有关index参数的更多信息，请参见<a href="#lindex获取指定索引上的元素">LINDEX</a>。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist hello world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; LSET mylist 1 redis</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;hello&quot;</span></span>
<span class="line"><span>2) &quot;redis&quot;</span></span></code></pre></div><h4 id="linsert-将元素插入列表" tabindex="-1">LINSERT：将元素插入列表 <a class="header-anchor" href="#linsert-将元素插入列表" aria-label="Permalink to &quot;LINSERT：将元素插入列表&quot;">​</a></h4><p>将存储在key的元素插入到指定值之前（before）或之后（after）的列表中。当key不存在时，它被认为是一个空列表，不执行任何操作。</p><p>当存储在key的值不是一个列表时，将返回一个错误。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist hello world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; LINSERT mylist before world ,</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;hello&quot;</span></span>
<span class="line"><span>2) &quot;,&quot;</span></span>
<span class="line"><span>3) &quot;world&quot;</span></span>
<span class="line"><span>&gt; LINSERT mylist after redis !</span></span>
<span class="line"><span>(integer) -1</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;hello&quot;</span></span>
<span class="line"><span>2) &quot;,&quot;</span></span>
<span class="line"><span>3) &quot;world&quot;</span></span></code></pre></div><h4 id="ltrim-修剪列表" tabindex="-1">LTRIM：修剪列表 <a class="header-anchor" href="#ltrim-修剪列表" aria-label="Permalink to &quot;LTRIM：修剪列表&quot;">​</a></h4><p>修剪现有列表，使其只包含指定的元素的指定范围。start和stop都是从零开始的索引，其中0是列表(头)的第一个元素，1是下一个元素，依此类推。</p><p>例如:<code>LTRIM foobar 0 2</code>将修改存储在foobar中的列表，以便只保留列表的前三个元素。</p><p>start和stop也可以是负数，表示与列表末尾的偏移量，其中-1是列表的最后一个元素，-2是倒数第二个元素，以此类推。</p><p>超出范围索引不会产生错误:如果start大于列表的结束，或者start &gt; end，结果将是一个空列表(这会导致key被删除)。如果end大于列表的末尾，Redis将把它视为列表的最后一个元素。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist one two three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; LTRIM mylist 0 1</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span>
<span class="line"><span>&gt; LTRIM mylist -1 -1</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;two&quot;</span></span></code></pre></div><h4 id="lrem-从列表中移除指定元素" tabindex="-1">LREM：从列表中移除指定元素 <a class="header-anchor" href="#lrem-从列表中移除指定元素" aria-label="Permalink to &quot;LREM：从列表中移除指定元素&quot;">​</a></h4><p>从存储在key处的列表中删除等于element的元素的第一次出现次数。count参数通过以下方式影响操作:</p><ul><li>count = 0：删除等于element的所有元素。</li><li>count &gt; 0：删除从头部到尾部移动的元素。</li><li>count &lt; 0：删除从尾部移动到头部的元素。</li></ul><p>例如，<code>LREM list -2 hello</code>将删除存储在list中的列表中最后两次出现的“hello”。</p><p>注意，不存在的键被视为空列表，因此当键不存在时，该命令将始终返回0。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist hello hello world redis hello</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; LREM mylist -1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;hello&quot;</span></span>
<span class="line"><span>2) &quot;hello&quot;</span></span>
<span class="line"><span>3) &quot;world&quot;</span></span>
<span class="line"><span>4) &quot;redis&quot;</span></span>
<span class="line"><span>&gt; LREM mylist 0 hello</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;world&quot;</span></span>
<span class="line"><span>2) &quot;redis&quot;</span></span></code></pre></div><h4 id="blpop-阻塞式左端弹出操作" tabindex="-1">BLPOP：阻塞式左端弹出操作 <a class="header-anchor" href="#blpop-阻塞式左端弹出操作" aria-label="Permalink to &quot;BLPOP：阻塞式左端弹出操作&quot;">​</a></h4><p><code>BLPOP</code>是一个阻塞列表弹出操作。它是<code>LPOP</code>的阻塞版本，因为当任何给定的列表中都没有要弹出的元素时，它会阻塞连接。从第一个非空列表的头部弹出一个元素，并按给定的顺序检查给定的键。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist1 a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; RPUSH mylist2 1 2 3</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; BLPOP mylist2 mylist1 0</span></span>
<span class="line"><span>1) &quot;mylist2&quot;</span></span>
<span class="line"><span>2) &quot;1&quot;</span></span>
<span class="line"><span>&gt; LRANGE mylist2 0 -1</span></span>
<span class="line"><span>1) &quot;2&quot;</span></span>
<span class="line"><span>2) &quot;3&quot;</span></span></code></pre></div><h5 id="非阻塞行为" tabindex="-1">非阻塞行为 <a class="header-anchor" href="#非阻塞行为" aria-label="Permalink to &quot;非阻塞行为&quot;">​</a></h5><p>在调用<code>BLPOP</code>时，如果指定的键中至少有一个包含非空列表，则从列表头部弹出一个元素，并将元素与弹出它的键一起返回给调用者。</p><p>键按给定的顺序进行检查。例如，<code>BLPOP list1 list2 list3 0</code>命令，假设键list1不存在，list2和list3包含非空列表。<code>BLPOP</code>保证从存储在list2的列表中返回一个元素(因为在按顺序检查list1、list2和list3时，它是第一个非空列表)。</p><h5 id="阻塞行为" tabindex="-1">阻塞行为 <a class="header-anchor" href="#阻塞行为" aria-label="Permalink to &quot;阻塞行为&quot;">​</a></h5><p>如果指定的键都不存在，<code>BLPOP</code>将阻塞连接，直到另一个客户端对其中一个键执行<code>LPUSH</code>或<code>RPUSH</code>操作。</p><p>一旦新数据出现在其中一个列表中，客户端返回解除阻塞的键的名称和弹出的值。</p><p>当<code>BLPOP</code>导致客户端阻塞且指定了非零超时时，当指定的超时已过期而没有对指定键中的至少一个进行push操作时，客户端将解除阻塞，返回一个nil多批量值。</p><p>timeout参数被解释为指定要阻塞的最大秒数的值。为0可以用来无限期阻塞。</p><h4 id="brpop-阻塞式右端弹出操作" tabindex="-1">BRPOP：阻塞式右端弹出操作 <a class="header-anchor" href="#brpop-阻塞式右端弹出操作" aria-label="Permalink to &quot;BRPOP：阻塞式右端弹出操作&quot;">​</a></h4><p><code>BRPOP</code>是一个阻塞列表弹出操作。它是<code>RPOP</code>的阻塞版本，因为当任何给定的列表中都没有要弹出的元素时，它会阻塞连接。从第一个非空列表的尾部弹出一个元素，并按给定的顺序检查给定的键。</p><p>查看<a href="#blpop阻塞式左端弹出操作">BLPOP</a>文档了解确切的语义，因为<code>BRPOP</code>与<code>BLPOP</code>相同，唯一的区别是它从列表尾部弹出元素，而不是从列表头部弹出元素。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist1 a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; RPUSH mylist2 1 2 3</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; BRPOP mylist2 mylist1 0</span></span>
<span class="line"><span>1) &quot;mylist2&quot;</span></span>
<span class="line"><span>2) &quot;3&quot;</span></span>
<span class="line"><span>&gt; LRANGE mylist2 0 -1</span></span>
<span class="line"><span>1) &quot;1&quot;</span></span>
<span class="line"><span>2) &quot;2&quot;</span></span></code></pre></div><h4 id="blmove-阻塞式弹出并推入另一个列表" tabindex="-1">BLMOVE：阻塞式弹出并推入另一个列表 <a class="header-anchor" href="#blmove-阻塞式弹出并推入另一个列表" aria-label="Permalink to &quot;BLMOVE：阻塞式弹出并推入另一个列表&quot;">​</a></h4><p><code>BLMOVE</code>是<a href="#lmove弹出并推入另一个列表">LMOVE</a>的阻塞变体。当source包含元素时，此命令的行为与<code>LMOVE</code>完全相同。当在<code>MULTI/EXEC</code>块中使用时，该命令的行为与<code>LMOVE</code>完全相同。当source为空时，Redis将阻塞连接，直到另一个客户端推送到它，或直到超时(指定阻塞的最大秒数的双重值)到达。timeout为0可以用来无限期阻塞。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; RPUSH mylist a b c d e</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; BLMOVE mylist myanotherlist right left 0</span></span>
<span class="line"><span>&quot;e&quot;</span></span>
<span class="line"><span>&gt; BLMOVE mylist myanotherlist left right 0</span></span>
<span class="line"><span>&quot;a&quot;</span></span>
<span class="line"><span>&gt; BLMOVE mylist myanotherlist right left 0</span></span>
<span class="line"><span>&quot;d&quot;</span></span>
<span class="line"><span>&gt; LRANGE mylist 0 -1</span></span>
<span class="line"><span>1) &quot;b&quot;</span></span>
<span class="line"><span>2) &quot;c&quot;</span></span>
<span class="line"><span>&gt; LRANGE myanotherlist 0 -1</span></span>
<span class="line"><span>1) &quot;d&quot;</span></span>
<span class="line"><span>2) &quot;e&quot;</span></span>
<span class="line"><span>3) &quot;a&quot;</span></span></code></pre></div><h3 id="sets-集合" tabindex="-1">Sets（集合） <a class="header-anchor" href="#sets-集合" aria-label="Permalink to &quot;Sets（集合）&quot;">​</a></h3><p>Redis sets是唯一字符串（成员）的无序集合，其行为类似于您最喜欢的编程语言（例如，Java HashSet等）中的集合。</p><h4 id="sadd-将元素添加到集合" tabindex="-1">SADD：将元素添加到集合 <a class="header-anchor" href="#sadd-将元素添加到集合" aria-label="Permalink to &quot;SADD：将元素添加到集合&quot;">​</a></h4><ul><li>语法：<code>SADD key member [member ...]</code></li></ul><p>将指定的成员添加到存储在key的集合中。已经是该集合成员的指定成员将被忽略。如果key不存在，则在添加指定成员之前创建一个新的集合。</p><p>当存储在key上的值不是一个集合时，将返回一个错误。</p><p>从Redis 2.4.0版本开始:接受多个成员参数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset hello world world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; SMEMBERS myset</span></span>
<span class="line"><span>1) &quot;world&quot;</span></span>
<span class="line"><span>2) &quot;hello&quot;</span></span></code></pre></div><h4 id="srem-从集合中移除元素" tabindex="-1">SREM：从集合中移除元素 <a class="header-anchor" href="#srem-从集合中移除元素" aria-label="Permalink to &quot;SREM：从集合中移除元素&quot;">​</a></h4><ul><li>语法：<code>SREM key member [member ...]</code></li></ul><p>从存储在key处的集合中删除指定的成员。不属于此集合的指定成员将被忽略。如果key不存在，则将其视为空集，该命令返回0。</p><p>当存储在key上的值不是一个集合时，将返回一个错误。</p><p>从Redis 2.4.0版本开始:接受多个成员参数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset one two three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SREM myset one four</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SMEMBERS myset</span></span>
<span class="line"><span>1) &quot;three&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span></code></pre></div><h4 id="smove-将元素从一个集合移动到另一个集合" tabindex="-1">SMOVE：将元素从一个集合移动到另一个集合 <a class="header-anchor" href="#smove-将元素从一个集合移动到另一个集合" aria-label="Permalink to &quot;SMOVE：将元素从一个集合移动到另一个集合&quot;">​</a></h4><ul><li>语法：<code>SMOVE source destination member</code></li></ul><p>将member从source集合移动到destination集合。这个操作是原子的。在每一个给定的时刻，元素都是其他客户机的source或destination的成员。</p><p>如果source集合不存在或不包含指定的元素，则不执行任何操作，返回0。否则，该元素将从source集合中删除并添加到destination集合中。如果指定的元素已经存在于destination集合中，则只从source集合中删除它。</p><p>如果source或destination没有设置值，则返回错误。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset one two three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SMOVE myset myotherset two</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SMEMBERS myset</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;three&quot;</span></span>
<span class="line"><span>&gt; SMEMBERS myotherset</span></span>
<span class="line"><span>1) &quot;two&quot;</span></span></code></pre></div><h4 id="smembers-获取集合包含的所有元素" tabindex="-1">SMEMBERS：获取集合包含的所有元素 <a class="header-anchor" href="#smembers-获取集合包含的所有元素" aria-label="Permalink to &quot;SMEMBERS：获取集合包含的所有元素&quot;">​</a></h4><ul><li>语法：<code>SMEMBERS key</code></li></ul><p>返回存储在key处的设置值的所有成员。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset hello world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; SMEMBERS myset</span></span>
<span class="line"><span>1) &quot;world&quot;</span></span>
<span class="line"><span>2) &quot;hello&quot;</span></span></code></pre></div><h4 id="scard-获取集合包含的元素数量" tabindex="-1">SCARD：获取集合包含的元素数量 <a class="header-anchor" href="#scard-获取集合包含的元素数量" aria-label="Permalink to &quot;SCARD：获取集合包含的元素数量&quot;">​</a></h4><ul><li>语法：<code>SCARD key</code></li></ul><p>返回存储在key的集合的基数(元素个数)。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset hello world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; SCARD myset</span></span>
<span class="line"><span>(integer) 2</span></span></code></pre></div><h4 id="sismember-检查给定元素是否存在于集合" tabindex="-1">SISMEMBER：检查给定元素是否存在于集合 <a class="header-anchor" href="#sismember-检查给定元素是否存在于集合" aria-label="Permalink to &quot;SISMEMBER：检查给定元素是否存在于集合&quot;">​</a></h4><ul><li>语法：<code>SISMEMBER key member</code></li></ul><p>如果member是存储在key上的集合的成员则返回：如果元素是集合的成员，则为1。如果元素不是set的成员，或者key不存在，则为0。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset one</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SISMEMBER myset one</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SISMEMBER myset two</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="srandmember-随机获取集合中的元素" tabindex="-1">SRANDMEMBER：随机获取集合中的元素 <a class="header-anchor" href="#srandmember-随机获取集合中的元素" aria-label="Permalink to &quot;SRANDMEMBER：随机获取集合中的元素&quot;">​</a></h4><ul><li>语法：<code>SRANDMEMBER key [count]</code></li></ul><p>当只使用key参数调用时，从存储在key处的set值中返回一个随机元素。</p><p>如果提供的count参数为正，则返回由不同元素组成的数组。数组的长度要么是count，要么是集合的基数(<code>SCARD</code>)，取两者中的较低者。</p><p>如果以负数计数调用，则行为会发生改变，命令允许多次返回相同的元素。在本例中，返回元素的数量是指定计数的绝对值。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset one two three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SRANDMEMBER myset</span></span>
<span class="line"><span>&quot;one&quot;</span></span>
<span class="line"><span>&gt; SRANDMEMBER myset</span></span>
<span class="line"><span>&quot;two&quot;</span></span>
<span class="line"><span>&gt; SRANDMEMBER myset 2</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span>
<span class="line"><span>&gt; SRANDMEMBER myset -2</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;one&quot;</span></span>
<span class="line"><span>&gt; SRANDMEMBER myset 4</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;three&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>&gt; SRANDMEMBER myset -4</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span>
<span class="line"><span>3) &quot;one&quot;</span></span>
<span class="line"><span>4) &quot;three&quot;</span></span>
<span class="line"><span>&gt; SMEMBERS myset</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;three&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span></code></pre></div><h4 id="spop-随机地从集合中移除指定数量的元素" tabindex="-1">SPOP：随机地从集合中移除指定数量的元素 <a class="header-anchor" href="#spop-随机地从集合中移除指定数量的元素" aria-label="Permalink to &quot;SPOP：随机地从集合中移除指定数量的元素&quot;">​</a></h4><ul><li>语法：<code>SPOP key [count]</code></li></ul><p>当只使用key参数调用时，从存储在key处的set值中删除并返回一个随机元素。这个操作类似于<a href="#srandmember随机获取集合中的元素">SRANDMEMBER</a>，不同的是<code>SRANDMEMBER</code>从集合中返回一个或多个随机元素，但不删除它。</p><p>默认情况下，该命令从集合中弹出单个成员。当提供可选的count参数时，答复将由多达count个成员组成，这取决于集合的基数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset one two three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SPOP myset</span></span>
<span class="line"><span>&quot;three&quot;</span></span>
<span class="line"><span>&gt; SMEMBERS myset</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span>
<span class="line"><span>&gt; SPOP myset -2</span></span>
<span class="line"><span>(error) ERR value is out of range, must be positive</span></span>
<span class="line"><span>&gt; SPOP myset 2</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span>
<span class="line"><span>&gt; SMEMBERS myset</span></span>
<span class="line"><span>(empty array)</span></span>
<span class="line"><span>&gt; SPOP myset 2</span></span>
<span class="line"><span>(empty array)</span></span></code></pre></div><h4 id="sinter-对集合执行交集计算" tabindex="-1">SINTER：对集合执行交集计算 <a class="header-anchor" href="#sinter-对集合执行交集计算" aria-label="Permalink to &quot;SINTER：对集合执行交集计算&quot;">​</a></h4><ul><li>语法：<code>SINTER key [key ...]</code></li></ul><p>返回由所有给定集合的交集产生的集合的成员。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset1 a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SADD myset2 c d e</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SINTER myset1 myset2</span></span>
<span class="line"><span>1) &quot;c&quot;</span></span></code></pre></div><h4 id="sinterstore-对集合执行交集计算并将结果保存到另外一个集合" tabindex="-1">SINTERSTORE：对集合执行交集计算并将结果保存到另外一个集合 <a class="header-anchor" href="#sinterstore-对集合执行交集计算并将结果保存到另外一个集合" aria-label="Permalink to &quot;SINTERSTORE：对集合执行交集计算并将结果保存到另外一个集合&quot;">​</a></h4><ul><li>语法：<code>SINTERSTORE destination key [key ...]</code></li></ul><p>这个命令等于<a href="#sinter对集合执行交集计算">SINTER</a>，但是它不是返回结果集，而是存储在destination中。</p><p>如果destination已经存在，则会覆盖它。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset1 a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SADD myset2 c d e</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SINTERSTORE myset3 myset1 myset2</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SMEMBERS myset3</span></span>
<span class="line"><span>1) &quot;c&quot;</span></span>
<span class="line"><span>&gt; SADD myset3 d</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SINTERSTORE myset3 myset1 myset2</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SMEMBERS myset3</span></span>
<span class="line"><span>1) &quot;c&quot;</span></span></code></pre></div><h4 id="sunion-对集合执行并集计算" tabindex="-1">SUNION：对集合执行并集计算 <a class="header-anchor" href="#sunion-对集合执行并集计算" aria-label="Permalink to &quot;SUNION：对集合执行并集计算&quot;">​</a></h4><ul><li>语法：<code>SUNION key [key ...]</code></li></ul><p>返回由所有给定集合的并集产生的集合的成员。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset1 a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SADD myset2 c d e</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SUNION myset1 myset2</span></span>
<span class="line"><span>1) &quot;c&quot;</span></span>
<span class="line"><span>2) &quot;a&quot;</span></span>
<span class="line"><span>3) &quot;b&quot;</span></span>
<span class="line"><span>4) &quot;e&quot;</span></span>
<span class="line"><span>5) &quot;d&quot;</span></span></code></pre></div><h4 id="sunionstore-对集合执行并集计算并将结果保存到另外一个集合" tabindex="-1">SUNIONSTORE：对集合执行并集计算并将结果保存到另外一个集合 <a class="header-anchor" href="#sunionstore-对集合执行并集计算并将结果保存到另外一个集合" aria-label="Permalink to &quot;SUNIONSTORE：对集合执行并集计算并将结果保存到另外一个集合&quot;">​</a></h4><ul><li>语法：<code>SUNIONSTORE destination key [key ...]</code></li></ul><p>这个命令等于<a href="#sunion对集合执行并集计算">SUNION</a>，但是它不是返回结果集，而是存储在destination中。</p><p>如果destination已经存在，则会覆盖它。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset1 a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SADD myset2 c d e</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SUNIONSTORE myset3 myset1 myset2</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; SMEMBERS myset3</span></span>
<span class="line"><span>1) &quot;c&quot;</span></span>
<span class="line"><span>2) &quot;a&quot;</span></span>
<span class="line"><span>3) &quot;b&quot;</span></span>
<span class="line"><span>4) &quot;e&quot;</span></span>
<span class="line"><span>5) &quot;d&quot;</span></span>
<span class="line"><span>&gt; SADD myset3 f</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SUNIONSTORE myset3 myset1 myset2</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; SMEMBERS myset3</span></span>
<span class="line"><span>1) &quot;c&quot;</span></span>
<span class="line"><span>2) &quot;a&quot;</span></span>
<span class="line"><span>3) &quot;b&quot;</span></span>
<span class="line"><span>4) &quot;e&quot;</span></span>
<span class="line"><span>5) &quot;d&quot;</span></span></code></pre></div><h4 id="sdiff-对集合执行差集计算" tabindex="-1">SDIFF：对集合执行差集计算 <a class="header-anchor" href="#sdiff-对集合执行差集计算" aria-label="Permalink to &quot;SDIFF：对集合执行差集计算&quot;">​</a></h4><ul><li>语法：<code>SDIFF key [key ...]</code></li></ul><p>返回由第一个集合与所有后续集合之间的差集产生的集合的成员。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset1 a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SADD myset2 c d e</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SDIFF myset1 myset2</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span></code></pre></div><h4 id="sdiffstore-对集合执行差集计算并将结果保存到另外一个集合" tabindex="-1">SDIFFSTORE：对集合执行差集计算并将结果保存到另外一个集合 <a class="header-anchor" href="#sdiffstore-对集合执行差集计算并将结果保存到另外一个集合" aria-label="Permalink to &quot;SDIFFSTORE：对集合执行差集计算并将结果保存到另外一个集合&quot;">​</a></h4><ul><li>语法：<code>SDIFFSTORE destination key [key ...]</code></li></ul><p>这个命令等于<a href="#sdiff对集合执行差集计算">SDIFF</a>，但是它不是返回结果集，而是存储在destination中。</p><p>如果destination已经存在，则会覆盖它。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SADD myset1 a b c</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SADD myset2 c d e</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; SDIFFSTORE myset3 myset1 myset2</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; SMEMBERS myset3</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span>
<span class="line"><span>&gt; SADD myset3 f</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SDIFFSTORE myset3 myset1 myset2</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; SMEMBERS myset3</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span></code></pre></div><h3 id="hashes-散列" tabindex="-1">Hashes（散列） <a class="header-anchor" href="#hashes-散列" aria-label="Permalink to &quot;Hashes（散列）&quot;">​</a></h3><p>Redis hashs是结构为字段值对集合的记录类型。同样，Redis hash类似于Java HashMap等。</p><h4 id="hset-设置hash上的一个或多个字段的值" tabindex="-1">HSET：设置hash上的一个或多个字段的值 <a class="header-anchor" href="#hset-设置hash上的一个或多个字段的值" aria-label="Permalink to &quot;HSET：设置hash上的一个或多个字段的值&quot;">​</a></h4><p>设置散列中存储在key到value处的字段。如果key不存在，则创建一个包含散列的新key。如果字段在散列中已经存在，则会覆盖它。</p><p>从Redis版本4.0.0开始，接受多个字段和值的参数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HSET myhash field1 hello field2 world</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre></div><p><code>HSET</code>默认会覆盖已有字段的值：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HSET myhash field1 hi</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="hget-获取hash上的一个字段的值" tabindex="-1">HGET：获取hash上的一个字段的值 <a class="header-anchor" href="#hget-获取hash上的一个字段的值" aria-label="Permalink to &quot;HGET：获取hash上的一个字段的值&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HGET myhash field1</span></span>
<span class="line"><span>&quot;hello&quot;</span></span>
<span class="line"><span>&gt; HSET myhash field1 hi</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; HGET myhash field1</span></span>
<span class="line"><span>&quot;hi&quot;</span></span></code></pre></div><h4 id="hmget-获取hash上的一个或多个字段的值" tabindex="-1">HMGET：获取hash上的一个或多个字段的值 <a class="header-anchor" href="#hmget-获取hash上的一个或多个字段的值" aria-label="Permalink to &quot;HMGET：获取hash上的一个或多个字段的值&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello field2 world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; HMGET myhash field1 field2</span></span>
<span class="line"><span>1) &quot;hello&quot;</span></span>
<span class="line"><span>2) &quot;world&quot;</span></span></code></pre></div><h4 id="hsetnx-只在字段不存在的情况下为它设置值" tabindex="-1">HSETNX：只在字段不存在的情况下为它设置值 <a class="header-anchor" href="#hsetnx-只在字段不存在的情况下为它设置值" aria-label="Permalink to &quot;HSETNX：只在字段不存在的情况下为它设置值&quot;">​</a></h4><p>仅当字段还不存在时，才将存储在键处的散列中的字段设置值。如果key不存在，则创建一个包含散列的新key。如果字段已经存在，则此操作无效。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HSETNX myhash field1 hi</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; HGET myhash field1</span></span>
<span class="line"><span>&quot;hello&quot;</span></span>
<span class="line"><span>&gt; HSETNX myhash field2 world</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HGET myhash field2</span></span>
<span class="line"><span>&quot;world&quot;</span></span></code></pre></div><h4 id="hstrlen-获取字段值的字节长度" tabindex="-1">HSTRLEN：获取字段值的字节长度 <a class="header-anchor" href="#hstrlen-获取字段值的字节长度" aria-label="Permalink to &quot;HSTRLEN：获取字段值的字节长度&quot;">​</a></h4><p>返回与存储在key的散列中的字段相关联的值的字符串长度。如果该键或该字段不存在，则返回0。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash f1 hello f2 99 f3 -256</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; HSTRLEN myhash f1</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; HSTRLEN myhash f2</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; HSTRLEN myhash f3</span></span>
<span class="line"><span>(integer) 4</span></span></code></pre></div><h4 id="hlen-获取散列包含的字段数量" tabindex="-1">HLEN：获取散列包含的字段数量 <a class="header-anchor" href="#hlen-获取散列包含的字段数量" aria-label="Permalink to &quot;HLEN：获取散列包含的字段数量&quot;">​</a></h4><p>返回存储在key的散列中包含的字段的数量。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello field2 world</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; HLEN myhash</span></span>
<span class="line"><span>(integer) 2</span></span></code></pre></div><h4 id="hexists-检查字段是否存在" tabindex="-1">HEXISTS：检查字段是否存在 <a class="header-anchor" href="#hexists-检查字段是否存在" aria-label="Permalink to &quot;HEXISTS：检查字段是否存在&quot;">​</a></h4><p>如果散列包含字段，则为1。如果散列不包含字段或键不存在，则为0。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HEXISTS myhash field1</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HEXISTS myhash field2</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="hincrby-对字段存储的整数值执行加法或减法操作" tabindex="-1">HINCRBY：对字段存储的整数值执行加法或减法操作 <a class="header-anchor" href="#hincrby-对字段存储的整数值执行加法或减法操作" aria-label="Permalink to &quot;HINCRBY：对字段存储的整数值执行加法或减法操作&quot;">​</a></h4><p>将存储在键处的散列中存储在字段处的数字按增量递增。如果key不存在，则创建一个包含散列的新key。如果字段不存在，则在执行操作前将该值设置为0。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field 5</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HINCRBY myhash field 1</span></span>
<span class="line"><span>(integer) 6</span></span>
<span class="line"><span>&gt; HINCRBY myhash field -1</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; HINCRBY myhash field -10</span></span>
<span class="line"><span>(integer) -5</span></span>
<span class="line"><span>&gt; HINCRBY myhash field 5.5</span></span>
<span class="line"><span>(error) ERR value is not an integer or out of range</span></span>
<span class="line"><span>&gt; HSET myhash field 5.5</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; HINCRBY myhash field -10</span></span>
<span class="line"><span>(error) ERR hash value is not an integer</span></span></code></pre></div><h4 id="hincrbyfloat-对字段存储的数字值执行浮点数加法或减法操作" tabindex="-1">HINCRBYFLOAT：对字段存储的数字值执行浮点数加法或减法操作 <a class="header-anchor" href="#hincrbyfloat-对字段存储的数字值执行浮点数加法或减法操作" aria-label="Permalink to &quot;HINCRBYFLOAT：对字段存储的数字值执行浮点数加法或减法操作&quot;">​</a></h4><p>将存储在键上并表示浮点数的散列的指定字段按指定的增量递增。如果增量值为负，则结果是哈希字段值减少而不是增加。如果该字段不存在，则先设置为0，再执行操作。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field 10.5</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; HINCRBYFLOAT myhash field 0.1</span></span>
<span class="line"><span>&quot;10.6&quot;</span></span>
<span class="line"><span>&gt; HINCRBYFLOAT myhash field -5</span></span>
<span class="line"><span>&quot;5.6&quot;</span></span>
<span class="line"><span>&gt; HSET myhash field 10</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; HINCRBYFLOAT myhash field 0.1</span></span>
<span class="line"><span>&quot;10.1&quot;</span></span>
<span class="line"><span>&gt; HINCRBYFLOAT myhash field -5</span></span>
<span class="line"><span>&quot;5.1&quot;</span></span></code></pre></div><h4 id="hdel-删除字段" tabindex="-1">HDEL：删除字段 <a class="header-anchor" href="#hdel-删除字段" aria-label="Permalink to &quot;HDEL：删除字段&quot;">​</a></h4><p>从存储在键上的散列中删除指定字段。在此散列中不存在的指定字段将被忽略。如果key不存在，它将被视为空散列，该命令返回0。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HDEL myhash field1</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; HDEL myhash field2</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="hkeys、hvals、hgetall-获取所有字段、所有值、所有字段和值" tabindex="-1">HKEYS、HVALS、HGETALL：获取所有字段、所有值、所有字段和值 <a class="header-anchor" href="#hkeys、hvals、hgetall-获取所有字段、所有值、所有字段和值" aria-label="Permalink to &quot;HKEYS、HVALS、HGETALL：获取所有字段、所有值、所有字段和值&quot;">​</a></h4><h5 id="hkeys" tabindex="-1">HKEYS <a class="header-anchor" href="#hkeys" aria-label="Permalink to &quot;HKEYS&quot;">​</a></h5><p>返回存储在key的散列中的所有字段名。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello field2 world</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; HKEYS myhash</span></span>
<span class="line"><span>1) &quot;field1&quot;</span></span>
<span class="line"><span>2) &quot;field2&quot;</span></span></code></pre></div><h5 id="hvals" tabindex="-1">HVALS <a class="header-anchor" href="#hvals" aria-label="Permalink to &quot;HVALS&quot;">​</a></h5><p>返回存储在key的散列中的所有值。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello field2 world</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; HVALS myhash</span></span>
<span class="line"><span>1) &quot;hello&quot;</span></span>
<span class="line"><span>2) &quot;world&quot;</span></span></code></pre></div><h5 id="hgetall" tabindex="-1">HGETALL <a class="header-anchor" href="#hgetall" aria-label="Permalink to &quot;HGETALL&quot;">​</a></h5><p>返回存储在key的散列的所有字段和值。在返回值中，每个字段名后面都跟着它的值，因此响应的长度是散列大小的两倍。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; HSET myhash field1 hello field2 world</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; HGETALL myhash</span></span>
<span class="line"><span>1) &quot;field1&quot;</span></span>
<span class="line"><span>2) &quot;hello&quot;</span></span>
<span class="line"><span>3) &quot;field2&quot;</span></span>
<span class="line"><span>4) &quot;world&quot;</span></span></code></pre></div><h3 id="sorted-sets-有序集合" tabindex="-1">Sorted sets（有序集合） <a class="header-anchor" href="#sorted-sets-有序集合" aria-label="Permalink to &quot;Sorted sets（有序集合）&quot;">​</a></h3><p>Redis排序集是按相关分数排序的唯一字符串（成员）的集合。当多个字符串具有相同的分数时，字符串将按字典顺序排列。</p><h4 id="zadd-添加或更新成员" tabindex="-1">ZADD：添加或更新成员 <a class="header-anchor" href="#zadd-添加或更新成员" aria-label="Permalink to &quot;ZADD：添加或更新成员&quot;">​</a></h4><ul><li>语法：<code>ZADD key [NX | XX] [GT | LT] [CH] [INCR] score member [score member...]</code></li></ul><p>将具有指定分数的所有指定成员添加到存储在key处的排序集。可以指定多个评分/成员对。如果指定的成员已经是排序集的成员，则更新评分并将元素重新插入到正确的位置，以确保正确的排序。</p><p>如果key不存在，则创建一个新的排序集，其中指定的成员为唯一的成员，就像排序集为空一样。如果key存在但不包含已排序的集合，则返回错误。</p><p>得分值应该是双精度浮点数的字符串表示形式。<code>+inf</code>和<code>-inf</code>值也是有效值。</p><ul><li><p>选项</p><p>注意:<code>GT</code>，<code>LT</code>和<code>NX</code>选项是互斥的。</p><ul><li><code>XX</code>：只更新已经存在的元素。不要添加新元素。</li><li><code>NX</code>：只添加新元素。不要更新已经存在的元素。</li><li><code>LT</code>：只在新分数小于当前分数的情况下更新现有元素。此标志不阻止添加新元素。</li><li><code>GT</code>：只有在新分数大于当前分数时才更新现有的元素。此标志不阻止添加新元素。</li><li><code>CH</code>：从添加的新元素数量修改返回值，到更改的元素总数(CH是changed的缩写)。更改的元素是新添加的元素和已经存在的元素，这些元素的分数已经更新。因此，在命令行中指定的具有与过去相同分数的元素不会被计数。注意:通常ZADD的返回值只计算新添加元素的数量。</li><li><code>INCR</code>：当指定此选项时，<code>ZADD</code>的作用类似于<code>ZINCRBY</code>。在这种模式下只能指定一个分数元素对。</li></ul></li><li><p>返回</p><ul><li><p>返回整数：</p><ul><li>当不带可选参数时，添加到排序集的元素数量(不包括分数更新)。</li><li>如果指定了<code>CH</code>选项，则表示更改(添加或更新)的元素数量。</li></ul></li><li><p>返回字符串：</p><ul><li>如果指定了<code>INCR</code>选项，返回值将是字符串。成员(双精度浮点数)的新分数表示为字符串，如果操作被中止(当使用<code>XX</code>或<code>NX</code>选项调用时)则为nil。</li></ul></li></ul></li><li><p>历史</p><ul><li>从Redis 2.4.0版本开始:接受多个元素。</li><li>从Redis 3.0.2版本开始:添加了<code>XX</code>, <code>NX</code>, <code>CH</code>和<code>INCR</code>选项。</li><li>从Redis 6.2.0版本开始:添加<code>GT</code>和<code>LT</code>选项。</li></ul></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 1 one 1 neo 2 two 3 three</span></span>
<span class="line"><span>(integer) 4</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;neo&quot;</span></span>
<span class="line"><span>2) &quot;1&quot;</span></span>
<span class="line"><span>3) &quot;one&quot;</span></span>
<span class="line"><span>4) &quot;1&quot;</span></span>
<span class="line"><span>5) &quot;two&quot;</span></span>
<span class="line"><span>6) &quot;2&quot;</span></span>
<span class="line"><span>7) &quot;three&quot;</span></span>
<span class="line"><span>8) &quot;3&quot;</span></span></code></pre></div><h4 id="zrem-移除指定的成员" tabindex="-1">ZREM：移除指定的成员 <a class="header-anchor" href="#zrem-移除指定的成员" aria-label="Permalink to &quot;ZREM：移除指定的成员&quot;">​</a></h4><ul><li>语法：<code>ZREM key member [member ...]</code></li></ul><p>从存储在键处的已排序集合中删除指定成员。不存在的成员被忽略。</p><p>如果key存在但不包含已排序的集合，则返回错误。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 1 one 2 two 3 three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZREM myzset two</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;1&quot;</span></span>
<span class="line"><span>3) &quot;three&quot;</span></span>
<span class="line"><span>4) &quot;3&quot;</span></span></code></pre></div><h4 id="zscore-获取成员的分值" tabindex="-1">ZSCORE：获取成员的分值 <a class="header-anchor" href="#zscore-获取成员的分值" aria-label="Permalink to &quot;ZSCORE：获取成员的分值&quot;">​</a></h4><ul><li>语法：<code>ZSCORE key member</code></li></ul><p>返回位于key的排序集合中成员的分数。</p><p>如果成员在排序集合中不存在，或者key不存在，则返回nil。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 1 one</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; ZSCORE myzset one</span></span>
<span class="line"><span>&quot;1&quot;</span></span>
<span class="line"><span>&gt; ZSCORE myzset two</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div><h4 id="zincrby-对成员的分值执行自增或自减操作" tabindex="-1">ZINCRBY：对成员的分值执行自增或自减操作 <a class="header-anchor" href="#zincrby-对成员的分值执行自增或自减操作" aria-label="Permalink to &quot;ZINCRBY：对成员的分值执行自增或自减操作&quot;">​</a></h4><ul><li>语法：<code>ZINCRBY key increment member</code></li></ul><p>按增量递增存储在键上的排序集中成员的得分。如果成员在排序集中不存在，则以增量作为其得分(就像其先前得分为0.0)。如果key不存在，则创建一个以指定成员为唯一成员的新排序集。</p><p>如果成员在排序集合中不存在，或者key不存在，则返回nil。</p><p>如果key存在但不包含已排序的集合，则返回错误。</p><p>得分值应该是数值的字符串表示形式，并接受双精度浮点数。可以提供一个负值来降低分数。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 1 one</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; ZINCRBY myzset 1.5 one</span></span>
<span class="line"><span>&quot;2.5&quot;</span></span>
<span class="line"><span>&gt; ZINCRBY myzset 2 two</span></span>
<span class="line"><span>&quot;2&quot;</span></span>
<span class="line"><span>&gt; ZINCRBY myzset -2.5 two</span></span>
<span class="line"><span>&quot;-0.5&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;two&quot;</span></span>
<span class="line"><span>2) &quot;-0.5&quot;</span></span>
<span class="line"><span>3) &quot;one&quot;</span></span>
<span class="line"><span>4) &quot;2.5&quot;</span></span></code></pre></div><h4 id="zcard-获取有序集合的大小" tabindex="-1">ZCARD：获取有序集合的大小 <a class="header-anchor" href="#zcard-获取有序集合的大小" aria-label="Permalink to &quot;ZCARD：获取有序集合的大小&quot;">​</a></h4><ul><li>语法：<code>ZCARD key</code></li></ul><p>返回存储在键的已排序集合的已排序集合基数(元素个数)。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 1 one 2 two</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZCARD myzset</span></span>
<span class="line"><span>(integer) 2</span></span></code></pre></div><h4 id="zrank、zrevrank-获取成员在有序集合中的排名" tabindex="-1">ZRANK、ZREVRANK：获取成员在有序集合中的排名 <a class="header-anchor" href="#zrank、zrevrank-获取成员在有序集合中的排名" aria-label="Permalink to &quot;ZRANK、ZREVRANK：获取成员在有序集合中的排名&quot;">​</a></h4><ul><li>语法：<code>ZRANK key member</code>或<code>ZREVRANK key member</code></li></ul><p>返回存储在key的排序集中成员的秩，分数从低到高排序。排名(或索引)以0为基础，这意味着得分最低的成员排名为0。</p><p>使用<code>ZREVRANK</code>获取一个元素的等级，其分数从高到低排序。</p><ul><li><p>返回</p><ul><li>如果成员在排序集中存在，则Integer reply:成员的秩。</li><li>如果成员在排序集合中不存在或键不存在，则Bulk string reply:nil。</li></ul></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 1 one 2 two 3 three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZRANK myzset one</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; ZRANK myzset three</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZREVRANK myzset one</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZREVRANK myzset three</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; ZRANK myzset four</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; ZREVRANK myzset four</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div><h4 id="zrange-获取指定索引范围内的成员" tabindex="-1">ZRANGE：获取指定索引范围内的成员 <a class="header-anchor" href="#zrange-获取指定索引范围内的成员" aria-label="Permalink to &quot;ZRANGE：获取指定索引范围内的成员&quot;">​</a></h4><ul><li>语法：<code>ZRANGE key start stop [BYSCORE | BYLEX] [REV] [LIMIT offset count] [WITHSCORES]</code></li></ul><p>返回存储在&lt;键&gt;的已排序集合中指定范围的元素。</p><p><code>ZRANGE</code>可以执行不同类型的范围查询:按索引(秩)、按分数或按字典顺序。</p><p>从Redis 6.2.0开始，该命令可以替换以下命令:<code>ZREVRANGE</code>, <code>ZRANGEBYSCORE</code>, <code>ZREVRANGEBYSCORE</code>, <code>ZRANGEBYLEX</code>和<code>ZREVRANGEBYLEX</code>。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 100 one 200 two 300 three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZRANGE myzset 1 2</span></span>
<span class="line"><span>1) &quot;two&quot;</span></span>
<span class="line"><span>2) &quot;three&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset -2 -1</span></span>
<span class="line"><span>1) &quot;two&quot;</span></span>
<span class="line"><span>2) &quot;three&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;two&quot;</span></span>
<span class="line"><span>3) &quot;three&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;100&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;200&quot;</span></span>
<span class="line"><span>5) &quot;three&quot;</span></span>
<span class="line"><span>6) &quot;300&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1 rev withscores</span></span>
<span class="line"><span>1) &quot;three&quot;</span></span>
<span class="line"><span>2) &quot;300&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;200&quot;</span></span>
<span class="line"><span>5) &quot;one&quot;</span></span>
<span class="line"><span>6) &quot;100&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; ZRANGE myzset 100 200 byscore withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;100&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;200&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset 300 200 byscore rev withscores</span></span>
<span class="line"><span>1) &quot;three&quot;</span></span>
<span class="line"><span>2) &quot;300&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;200&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset 100 300 byscore limit 0 2 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;100&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;200&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset (100 (300 byscore withscores</span></span>
<span class="line"><span>1) &quot;two&quot;</span></span>
<span class="line"><span>2) &quot;200&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset -inf +inf byscore withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;100&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;200&quot;</span></span>
<span class="line"><span>5) &quot;three&quot;</span></span>
<span class="line"><span>6) &quot;300&quot;</span></span>
<span class="line"><span>&gt; FLUSHDB</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; ZADD myzset 0 a 0 b 0 c 0 d 0 e 0 f</span></span>
<span class="line"><span>(integer) 6</span></span>
<span class="line"><span>&gt; ZRANGE myzset - + bylex</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span>
<span class="line"><span>3) &quot;c&quot;</span></span>
<span class="line"><span>4) &quot;d&quot;</span></span>
<span class="line"><span>5) &quot;e&quot;</span></span>
<span class="line"><span>6) &quot;f&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset - (d bylex</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span>
<span class="line"><span>3) &quot;c&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset - [d bylex</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;b&quot;</span></span>
<span class="line"><span>3) &quot;c&quot;</span></span>
<span class="line"><span>4) &quot;d&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset + [d bylex rev</span></span>
<span class="line"><span>1) &quot;f&quot;</span></span>
<span class="line"><span>2) &quot;e&quot;</span></span>
<span class="line"><span>3) &quot;d&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset + [d bylex rev limit 1 2</span></span>
<span class="line"><span>1) &quot;e&quot;</span></span>
<span class="line"><span>2) &quot;d&quot;</span></span></code></pre></div><h4 id="zcount-统计指定分值范围内的成员数量" tabindex="-1">ZCOUNT：统计指定分值范围内的成员数量 <a class="header-anchor" href="#zcount-统计指定分值范围内的成员数量" aria-label="Permalink to &quot;ZCOUNT：统计指定分值范围内的成员数量&quot;">​</a></h4><ul><li>语法：<code>ZCOUNT key min max</code></li></ul><p>返回在key处的排序集合中的元素个数，其值介于最小值和最大值之间。</p><p>min和max参数具有与ZRANGEBYSCORE所描述的相同的语义。</p><p>注意:该命令的复杂度仅为O(log(N))，因为它使用元素秩(参见ZRANK)来了解范围。因此，不需要做与范围大小成正比的功。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 100 one 200 two 300 three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZCOUNT myzset -inf +inf</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZCOUNT myzset (100 300</span></span>
<span class="line"><span>(integer) 2</span></span></code></pre></div><h4 id="zlexcount-统计位于字典序指定范围内的成员数量" tabindex="-1">ZLEXCOUNT：统计位于字典序指定范围内的成员数量 <a class="header-anchor" href="#zlexcount-统计位于字典序指定范围内的成员数量" aria-label="Permalink to &quot;ZLEXCOUNT：统计位于字典序指定范围内的成员数量&quot;">​</a></h4><ul><li>语法：<code>ZLEXCOUNT key min max</code></li></ul><p>当以相同的分数插入排序集中的所有元素时，为了强制按字典顺序排序，该命令返回在key处的排序集中的元素数量，其值介于min和max之间。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 0 a 0 b 0 c 0 d 0 e 0 f</span></span>
<span class="line"><span>(integer) 6</span></span>
<span class="line"><span>&gt; ZLEXCOUNT myzset - +</span></span>
<span class="line"><span>(integer) 6</span></span>
<span class="line"><span>&gt; ZLEXCOUNT myzset [b (f</span></span>
<span class="line"><span>(integer) 4</span></span></code></pre></div><h4 id="zremrangebyrank-移除指定排名范围内的成员" tabindex="-1">ZREMRANGEBYRANK：移除指定排名范围内的成员 <a class="header-anchor" href="#zremrangebyrank-移除指定排名范围内的成员" aria-label="Permalink to &quot;ZREMRANGEBYRANK：移除指定排名范围内的成员&quot;">​</a></h4><ul><li>语法：<code>ZREMRANGEBYRANK key start stop</code></li></ul><p>移除存储在键上的排序集中的所有元素，其秩介于start和stop之间。start和stop都是基于0的索引，0是得分最低的元素。这些索引可以是负数，它们表示从得分最高的元素开始的偏移量。例如:-1是得分最高的元素，-2是得分第二高的元素，依此类推。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 100 one 200 two 300 three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZREMRANGEBYRANK myzset -2 -1</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span></code></pre></div><h4 id="zremrangebyscore-移除指定分值范围内的成员" tabindex="-1">ZREMRANGEBYSCORE：移除指定分值范围内的成员 <a class="header-anchor" href="#zremrangebyscore-移除指定分值范围内的成员" aria-label="Permalink to &quot;ZREMRANGEBYSCORE：移除指定分值范围内的成员&quot;">​</a></h4><ul><li>语法：<code>ZREMRANGEBYSCORE key min max</code></li></ul><p>移除存储在key处且得分介于min和max(包括)之间的排序集中的所有元素。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 100 one 200 two 300 three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZREMRANGEBYSCORE myzset -inf (300</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1</span></span>
<span class="line"><span>1) &quot;three&quot;</span></span></code></pre></div><h4 id="zremrangebylex-移除位于字典序指定范围内的成员" tabindex="-1">ZREMRANGEBYLEX：移除位于字典序指定范围内的成员 <a class="header-anchor" href="#zremrangebylex-移除位于字典序指定范围内的成员" aria-label="Permalink to &quot;ZREMRANGEBYLEX：移除位于字典序指定范围内的成员&quot;">​</a></h4><ul><li>语法：<code>ZREMRANGEBYLEX key min max</code></li></ul><p>当以相同的分数插入排序集中的所有元素时，为了强制按字典顺序排序，该命令删除存储在key处、位于min和max指定的字典顺序范围之间的排序集中的所有元素。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 0 a 0 b 0 c 0 d 0 e 0 f</span></span>
<span class="line"><span>(integer) 6</span></span>
<span class="line"><span>&gt; ZREMRANGEBYLEX myzset [b (f</span></span>
<span class="line"><span>(integer) 4</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;f&quot;</span></span></code></pre></div><h4 id="zunionstore-有序集合的并集运算" tabindex="-1">ZUNIONSTORE：有序集合的并集运算 <a class="header-anchor" href="#zunionstore-有序集合的并集运算" aria-label="Permalink to &quot;ZUNIONSTORE：有序集合的并集运算&quot;">​</a></h4><ul><li>语法：<code>ZUNIONSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE &lt;SUM | MIN | MAX&gt;]</code></li></ul><p>计算由指定键给出的numkeys排序集的并集，并将结果存储在目标中。在传递输入键和其他(可选)参数之前，必须提供输入键的数量(numkeys)。</p><p>默认情况下，一个元素的结果得分是它在其存在的排序集中得分的总和。</p><p>使用WEIGHTS选项，可以为每个输入排序集指定乘法因子。这意味着，在传递给聚合函数之前，每个输入排序集中的每个元素的得分都要乘以这个因子。当没有给出WEIGHTS时，乘法因子默认为1。</p><p>通过AGGREGATE选项，可以指定如何聚合联合的结果。该选项默认为SUM，其中元素的得分在其存在的输入中求和。当将该选项设置为MIN或MAX时，结果集将包含元素在输入中存在的最小或最大分数。</p><p>如果目标已经存在，则会覆盖它。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD zset1 1 one 2 two 3 three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZADD zset2 1 one 2 two</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZUNIONSTORE zset3 2 zset1 zset2</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZRANGE zset3 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;2&quot;</span></span>
<span class="line"><span>3) &quot;three&quot;</span></span>
<span class="line"><span>4) &quot;3&quot;</span></span>
<span class="line"><span>5) &quot;two&quot;</span></span>
<span class="line"><span>6) &quot;4&quot;</span></span>
<span class="line"><span>&gt; ZUNIONSTORE zset3 2 zset1 zset2 weights 2 3</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZRANGE zset3 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;5&quot;</span></span>
<span class="line"><span>3) &quot;three&quot;</span></span>
<span class="line"><span>4) &quot;6&quot;</span></span>
<span class="line"><span>5) &quot;two&quot;</span></span>
<span class="line"><span>6) &quot;10&quot;</span></span>
<span class="line"><span>&gt; ZUNIONSTORE zset3 2 zset1 zset2 aggregate min</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZRANGE zset3 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;1&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;2&quot;</span></span>
<span class="line"><span>5) &quot;three&quot;</span></span>
<span class="line"><span>6) &quot;3&quot;</span></span></code></pre></div><h4 id="zinterstore-有序集合的交集运算" tabindex="-1">ZINTERSTORE：有序集合的交集运算 <a class="header-anchor" href="#zinterstore-有序集合的交集运算" aria-label="Permalink to &quot;ZINTERSTORE：有序集合的交集运算&quot;">​</a></h4><ul><li>语法：<code>ZINTERSTORE destination numkeys key [key ...] [WEIGHTS weight [weight ...]] [AGGREGATE &lt;SUM | MIN | MAX&gt;]</code></li></ul><p>计算由指定键给出的numkeys排序集的交集，并将结果存储在目标中。在传递输入键和其他(可选)参数之前，必须提供输入键的数量(numkeys)。</p><p>默认情况下，一个元素的结果得分是它在其存在的排序集中得分的总和。因为交集要求一个元素是每个给定排序集的成员，这导致结果排序集中每个元素的得分等于输入排序集的数量。</p><p>使用WEIGHTS选项，可以为每个输入排序集指定乘法因子。这意味着，在传递给聚合函数之前，每个输入排序集中的每个元素的得分都要乘以这个因子。当没有给出WEIGHTS时，乘法因子默认为1。</p><p>通过AGGREGATE选项，可以指定如何聚合联合的结果。该选项默认为SUM，其中元素的得分在其存在的输入中求和。当将该选项设置为MIN或MAX时，结果集将包含元素在输入中存在的最小或最大分数。</p><p>如果目标已经存在，则会覆盖它。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD zset1 1 one 2 two 3 three</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; ZADD zset2 1 one 2 two</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZINTERSTORE zset3 2 zset1 zset2</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZRANGE zset3 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;2&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;4&quot;</span></span>
<span class="line"><span>&gt; ZINTERSTORE zset3 2 zset1 zset2 weights 2 3</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZRANGE zset3 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;5&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;10&quot;</span></span>
<span class="line"><span>&gt; ZINTERSTORE zset3 2 zset1 zset2 aggregate min</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZRANGE zset3 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;one&quot;</span></span>
<span class="line"><span>2) &quot;1&quot;</span></span>
<span class="line"><span>3) &quot;two&quot;</span></span>
<span class="line"><span>4) &quot;2&quot;</span></span></code></pre></div><h4 id="zpopmax、zpopmin-弹出分值最高和最低的成员" tabindex="-1">ZPOPMAX、ZPOPMIN：弹出分值最高和最低的成员 <a class="header-anchor" href="#zpopmax、zpopmin-弹出分值最高和最低的成员" aria-label="Permalink to &quot;ZPOPMAX、ZPOPMIN：弹出分值最高和最低的成员&quot;">​</a></h4><ul><li>语法：<code>ZPOPMAX key [count]</code>或<code>ZPOPMIN key [count]</code></li></ul><p>删除并返回存储在key的排序集中得分最高（或最低）的成员，最多不超过count个。</p><p>如果未指定，count的默认值为1。指定高于排序集基数的计数值将不会产生错误。当返回多个元素时，得分最高（或最低）的元素将是第一个，其次是得分较低（或较高）的元素。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD myzset 1 a 2 b 3 c 4 e 5 f 6 g</span></span>
<span class="line"><span>(integer) 6</span></span>
<span class="line"><span>&gt; ZPOPMAX myzset 2</span></span>
<span class="line"><span>1) &quot;g&quot;</span></span>
<span class="line"><span>2) &quot;6&quot;</span></span>
<span class="line"><span>3) &quot;f&quot;</span></span>
<span class="line"><span>4) &quot;5&quot;</span></span>
<span class="line"><span>&gt; ZPOPMIN myzset</span></span>
<span class="line"><span>1) &quot;a&quot;</span></span>
<span class="line"><span>2) &quot;1&quot;</span></span>
<span class="line"><span>&gt; ZRANGE myzset 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;b&quot;</span></span>
<span class="line"><span>2) &quot;2&quot;</span></span>
<span class="line"><span>3) &quot;c&quot;</span></span>
<span class="line"><span>4) &quot;3&quot;</span></span>
<span class="line"><span>5) &quot;e&quot;</span></span>
<span class="line"><span>6) &quot;4&quot;</span></span></code></pre></div><h4 id="bzpopmax、bzpopmin-阻塞式最大-最小元素弹出操作" tabindex="-1">BZPOPMAX、BZPOPMIN：阻塞式最大/最小元素弹出操作 <a class="header-anchor" href="#bzpopmax、bzpopmin-阻塞式最大-最小元素弹出操作" aria-label="Permalink to &quot;BZPOPMAX、BZPOPMIN：阻塞式最大/最小元素弹出操作&quot;">​</a></h4><ul><li>语法：<code>BZPOPMAX key [key ...] timeout</code>或<code>BZPOPMIN key [count]</code></li></ul><p>它是阻塞版本，因为当没有成员要从任何给定的排序集中弹出时，它会阻塞连接。从第一个非空排序集弹出得分最高（或最低）的成员，并按给定的顺序检查给定的键。</p><p>timeout参数被解释为指定要阻塞的最大秒数的双值。超时为零可以用来无限期阻塞。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; ZADD zset1 1 a</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; ZADD zset2 1 aa 2 bb</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; BZPOPMAX zset1 zset2 3</span></span>
<span class="line"><span>1) &quot;zset1&quot;</span></span>
<span class="line"><span>2) &quot;a&quot;</span></span>
<span class="line"><span>3) &quot;1&quot;</span></span>
<span class="line"><span>&gt; BZPOPMIN zset1 zset2 3</span></span>
<span class="line"><span>1) &quot;zset2&quot;</span></span>
<span class="line"><span>2) &quot;aa&quot;</span></span>
<span class="line"><span>3) &quot;1&quot;</span></span>
<span class="line"><span>&gt; BZPOPMIN zset1 zset2 3</span></span>
<span class="line"><span>1) &quot;zset2&quot;</span></span>
<span class="line"><span>2) &quot;bb&quot;</span></span>
<span class="line"><span>3) &quot;2&quot;</span></span>
<span class="line"><span>&gt; BZPOPMIN zset1 zset2 3</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>(3.03s)</span></span></code></pre></div><h3 id="streams-流" tabindex="-1">Streams（流） <a class="header-anchor" href="#streams-流" aria-label="Permalink to &quot;Streams（流）&quot;">​</a></h3><p>Redis stream是一种数据结构，其作用类似于追加日志。您可以使用流来实时记录和同时聚合事件。</p><p>Redis为每个流条目生成一个唯一的ID。您可以使用这些id稍后检索它们关联的条目，或者读取和处理流中的所有后续条目。</p><p>Redis流支持多种精简策略(防止流无界增长)和多个消费策略(参见XREAD, XREADGROUP和XRANGE)。</p><h4 id="xadd-追加新元素到流的末尾" tabindex="-1">XADD：追加新元素到流的末尾 <a class="header-anchor" href="#xadd-追加新元素到流的末尾" aria-label="Permalink to &quot;XADD：追加新元素到流的末尾&quot;">​</a></h4><ul><li><p>语法：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>XADD key [NOMKSTREAM] [&lt;MAXLEN | MINID&gt; [= | ~] threshold</span></span>
<span class="line"><span>[LIMIT count]] &lt;* | id&gt; field value [field value ...]</span></span></code></pre></div></li></ul><p>将指定的流项附加到流的指定键处。如果该键不存在，作为运行此命令的副作用，将使用流值创建该键。可以使用NOMKSTREAM选项禁用流键的创建。</p><p>条目由字段值对列表组成。字段值对按照用户给出的顺序存储。读取流的命令，如XRANGE或XREAD，保证以XADD添加字段和值时的相同顺序返回它们。</p><p>XADD是唯一可以向流中添加数据的Redis命令，但还有其他命令，如XDEL和XTRIM，能够从流中删除数据。</p><h5 id="指定流id作为参数" tabindex="-1">指定流ID作为参数 <a class="header-anchor" href="#指定流id作为参数" aria-label="Permalink to &quot;指定流ID作为参数&quot;">​</a></h5><p>流条目ID标识流中给定的条目。</p><p>如果指定的ID参数是*字符(星号ASCII字符)，XADD命令将自动为您生成唯一的ID。然而，尽管只在极少数情况下有用，但可以指定格式良好的ID，这样新条目将完全使用指定的ID添加。</p><p>id由两个由<code>-</code>字符分隔的数字指定，如<code>1526919030474-55</code>。这两个量都是64位的数字。当自动生成ID时，第一部分是生成ID的Redis实例的Unix时间(以毫秒为单位)。第二部分只是一个序列号，用于区分在同一毫秒内生成的id。</p><p>您还可以指定一个不完整的ID，它只包含毫秒部分，对于序列部分，它被解释为零值。如果只自动生成序列部分，请指定毫秒部分，后面跟着-分隔符和*字符:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream 1526919030474-55 message &quot;Hello,&quot;</span></span>
<span class="line"><span>&quot;1526919030474-55&quot;</span></span>
<span class="line"><span>&gt; XADD mystream 1526919030474-* message &quot; World!&quot;</span></span>
<span class="line"><span>&quot;1526919030474-56&quot;</span></span></code></pre></div><p>ID保证始终是增量的:如果比较刚刚插入的条目的ID，它将大于任何其他过去的ID，因此条目在流中完全有序。为了保证该属性，如果流中的当前顶部ID的时间大于实例的当前本地时间，则将使用顶部进入时间，并且ID的序列部分增加。例如，当本地时钟向后跳时，或者在故障转移之后，新的主服务器具有不同的绝对时间时，可能会发生这种情况。</p><p>当用户向XADD指定显式ID时，最小有效ID为0-1，并且用户必须指定一个大于当前流中的任何其他ID的ID，否则命令将失败并返回错误。通常求助于特定的id是有用的，只有当你有另一个系统生成唯一的id(例如SQL表)，你真的想要Redis流id匹配另一个系统。</p><h5 id="限制流" tabindex="-1">限制流 <a class="header-anchor" href="#限制流" aria-label="Permalink to &quot;限制流&quot;">​</a></h5><p>XADD包含了与XTRIM命令相同的语义——有关更多信息，请参阅其文档页面。这允许添加新条目并通过对XADD的单个调用来检查流的大小，从而有效地用任意阈值限制流。虽然精确的修剪是可能的，而且是默认的，但由于流的内部表示，使用几乎精确的修剪(~参数)用XADD添加条目和修剪流会更有效。</p><p>例如，以以下形式调用XADD:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>XADD mystream MAXLEN ~ 1000 * ... entry fields here ...</span></span></code></pre></div><p>将添加一个新条目，但也将删除旧条目，这样流将只包含1000个条目，或者最多包含几十个条目。</p><h5 id="返回值-2" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-2" aria-label="Permalink to &quot;返回值&quot;">​</a></h5><p>批量字符串回复，具体为:</p><p>该命令返回添加的条目的ID。如果将*作为ID参数传递，则该ID是自动生成的ID，否则该命令只返回用户在插入时指定的相同ID。</p><p>当与NOMKSTREAM选项一起使用时，该命令返回Null回复，并且键不存在。</p><h5 id="示例-3" tabindex="-1">示例 <a class="header-anchor" href="#示例-3" aria-label="Permalink to &quot;示例&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream 100000-0 k1 v1</span></span>
<span class="line"><span>&quot;100000-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream 100000-1 k1 v1 k2 v2</span></span>
<span class="line"><span>&quot;100000-1&quot;</span></span>
<span class="line"><span>&gt; XADD mystream 100000-* k1 v1</span></span>
<span class="line"><span>&quot;100000-2&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675495165942-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream maxlen 3 * k1 v1</span></span>
<span class="line"><span>&quot;1675495241389-0&quot;</span></span>
<span class="line"><span>&gt; XLEN mystream</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; XADD mystream maxlen ~ 3 * k1 v1</span></span>
<span class="line"><span>&quot;1675495451126-0&quot;</span></span>
<span class="line"><span>&gt; XLEN mystream</span></span>
<span class="line"><span>(integer) 4</span></span></code></pre></div><h4 id="xtrim-对流进行修剪" tabindex="-1">XTRIM：对流进行修剪 <a class="header-anchor" href="#xtrim-对流进行修剪" aria-label="Permalink to &quot;XTRIM：对流进行修剪&quot;">​</a></h4><ul><li>语法：<code>XTRIM key &lt;MAXLEN | MINID&gt; [= | ~] threshold [LIMIT count]</code></li></ul><p>XTRIM在需要时通过清除较旧的条目(id较低的条目)来修剪流。</p><p>修剪流可以使用以下策略之一:</p><ul><li><p>MAXLEN:只要流的长度超过指定的长度，就会清除条目</p></li><li><p>threshold:其中阈值为正整数。</p></li><li><p>MINID:清除ID小于阈值的表项，其中阈值是一个流ID。</p></li></ul><p>例如，这将把流修剪到最近的1000项:<code>XTRIM mystream MAXLEN 1000</code>。</p><p>而在本例中，ID小于649085820-0的所有条目将被清除:<code>XTRIM mystream MINID 649085820</code>。</p><p>默认情况下，或者当提供可选的=参数时，该命令执行精确的调整。</p><p>根据策略的不同，精确修剪意味着:</p><ul><li><p>MAXLEN:修剪后的流的长度将恰好是其原始长度和指定阈值之间的最小值。</p></li><li><p>MINID:流中最老的ID将恰好是其原始最老ID与指定阈值之间的最大值。</p></li></ul><h5 id="近乎精确的修剪" tabindex="-1">近乎精确的修剪 <a class="header-anchor" href="#近乎精确的修剪" aria-label="Permalink to &quot;近乎精确的修剪&quot;">​</a></h5><p>因为精确的修剪可能需要Redis服务器付出额外的努力，所以可以提供可选的~参数来提高效率。</p><p>例如:<code>XTRIM mystream MAXLEN ~ 1000</code>。</p><p>MAXLEN策略和阈值之间的~参数意味着用户请求修剪流，使其长度至少等于阈值，但可能略大于阈值。在这种情况下，Redis会在性能可以提高时(例如，当数据结构中的整个宏节点不能被删除时)提前停止修剪。这使得修剪更加有效，这通常是您想要的，尽管在修剪之后，流可能会有几十个超过阈值的额外条目。</p><p>在使用~时控制该命令的工作量的另一种方法是使用LIMIT子句。使用时，它指定将被清除的条目的最大计数。当LIMIT和count未指定时，默认值100 *宏节点中的条目数将隐式用作计数。将值0指定为count将完全禁用限制机制。</p><h5 id="示例-4" tabindex="-1">示例 <a class="header-anchor" href="#示例-4" aria-label="Permalink to &quot;示例&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675648181613-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675648188223-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675648188941-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675648189544-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675648190582-0&quot;</span></span>
<span class="line"><span>&gt; XTRIM mystream maxlen 3</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; XLEN mystream</span></span>
<span class="line"><span>(integer) 3</span></span></code></pre></div><h4 id="xdel-移除指定元素" tabindex="-1">XDEL：移除指定元素 <a class="header-anchor" href="#xdel-移除指定元素" aria-label="Permalink to &quot;XDEL：移除指定元素&quot;">​</a></h4><ul><li>语法：<code>XDEL key id [id ...]</code></li></ul><p>从流中删除指定的项，并返回已删除的项数。如果流中不存在某些指定的id，则此数目可能小于传递给命令的id数目。</p><p>通常情况下，你可能认为Redis流是一个只能追加的数据结构，但是Redis流是在内存中表示的，所以我们也可以删除条目。这可能是有用的，例如，为了遵守某些隐私政策。</p><ul><li><p>返回</p><p>整数回复:实际删除的条目数。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675648704833-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675648706009-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675648709915-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream 10000000000000 k1 v1</span></span>
<span class="line"><span>&quot;10000000000000-0&quot;</span></span>
<span class="line"><span>&gt; XDEL mystream 10000000000000-0 1675648189544-0</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; XLEN mystream</span></span>
<span class="line"><span>(integer) 3</span></span></code></pre></div><h4 id="xlen-获取流包含的元素数量" tabindex="-1">XLEN：获取流包含的元素数量 <a class="header-anchor" href="#xlen-获取流包含的元素数量" aria-label="Permalink to &quot;XLEN：获取流包含的元素数量&quot;">​</a></h4><ul><li>语法：<code>XLEN key</code></li></ul><p>返回流中的条目数。如果指定的键不存在，该命令返回零，就像流为空一样。但是请注意，不像其他Redis类型，零长度流是可能的，所以你应该调用TYPE或EXISTS来检查一个键是否存在。</p><p>一旦流内部没有条目(例如在XDEL调用之后)，流就不会自动删除，因为流可能有与之关联的消费者组。</p><ul><li><p>返回</p><p>整数回复:该流在键处的条目数。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675649321401-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675649322259-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675649322771-0&quot;</span></span>
<span class="line"><span>&gt; XLEN mystream</span></span>
<span class="line"><span>(integer) 3</span></span></code></pre></div><h4 id="xrange-正序访问流中元素" tabindex="-1">XRANGE：正序访问流中元素 <a class="header-anchor" href="#xrange-正序访问流中元素" aria-label="Permalink to &quot;XRANGE：正序访问流中元素&quot;">​</a></h4><ul><li>语法：<code>XRANGE key start end [COUNT count]</code></li></ul><p>该命令返回匹配给定id范围的流项。范围由最小ID和最大ID指定。返回ID在两个指定的ID之间或恰好是两个指定ID之一的所有条目(封闭间隔)。</p><p>XRANGE命令有很多应用:</p><ul><li><p>返回特定时间范围内的项目。这是可能的，因为流id与时间相关。</p></li><li><p>增量迭代流，每次迭代只返回几个项。然而，它在语义上比SCAN函数家族健壮得多。</p></li><li><p>从流中获取单个条目，提供两次要获取的条目ID:作为查询间隔的开始和结束。</p></li></ul><p>该命令还有一个以相反顺序返回项的对等命令，称为<a href="#xrevrange倒序访问流中元素">XREVRANGE</a>，在其他方面是相同的。</p><h5 id="特殊id-和" tabindex="-1">特殊id-和+ <a class="header-anchor" href="#特殊id-和" aria-label="Permalink to &quot;特殊id-和+&quot;">​</a></h5><p>特殊ID -和+分别表示流中可能的最小ID和最大ID，因此下面的命令将只返回流中的每个条目:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XRANGE somestream - +</span></span>
<span class="line"><span>1) 1) 1526985054069-0</span></span>
<span class="line"><span>   2) 1) &quot;duration&quot;</span></span>
<span class="line"><span>      2) &quot;72&quot;</span></span>
<span class="line"><span>      3) &quot;event-id&quot;</span></span>
<span class="line"><span>      4) &quot;9&quot;</span></span>
<span class="line"><span>      5) &quot;user-id&quot;</span></span>
<span class="line"><span>      6) &quot;839248&quot;</span></span>
<span class="line"><span>2) 1) 1526985069902-0</span></span>
<span class="line"><span>   2) 1) &quot;duration&quot;</span></span>
<span class="line"><span>      2) &quot;415&quot;</span></span>
<span class="line"><span>      3) &quot;event-id&quot;</span></span>
<span class="line"><span>      4) &quot;2&quot;</span></span>
<span class="line"><span>      5) &quot;user-id&quot;</span></span>
<span class="line"><span>      6) &quot;772213&quot;</span></span>
<span class="line"><span>... other entries here ...</span></span></code></pre></div><p>特殊id -和+分别表示最小范围id和最大范围id，但是它们更便于输入。</p><h5 id="不完整的id" tabindex="-1">不完整的id <a class="header-anchor" href="#不完整的id" aria-label="Permalink to &quot;不完整的id&quot;">​</a></h5><p>流id由两部分组成，Unix毫秒时间戳和插入同一毫秒的条目的序列号。可以使用XRANGE仅指定ID的第一部分，即毫秒时间，如下例所示:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XRANGE somestream 1526985054069 1526985055069</span></span></code></pre></div><p>在本例中，XRANGE将自动用-0补全开始间隔，用-18446744073709551615补全结束间隔，以便返回在给定毫秒和另一个指定毫秒结束之间生成的所有条目。这也意味着重复相同的毫秒两次，我们将获得该毫秒内的所有条目，因为序列号范围将从0到最大值。</p><p>在这种情况下，XRANGE作为一个范围查询命令，在指定的时间内获取条目。这对于访问流中过去事件的历史非常方便。</p><h5 id="独占范围" tabindex="-1">独占范围 <a class="header-anchor" href="#独占范围" aria-label="Permalink to &quot;独占范围&quot;">​</a></h5><p>默认情况下，范围很近(包括)，这意味着应答可以包括id与查询的开始和结束间隔匹配的条目。可以通过在ID前面加上字符(来指定一个开放间隔(独占)。这对于迭代流非常有用，如下所述。</p><h5 id="返回最大条目数" tabindex="-1">返回最大条目数 <a class="header-anchor" href="#返回最大条目数" aria-label="Permalink to &quot;返回最大条目数&quot;">​</a></h5><p>使用COUNT选项可以减少报告的条目数量。这是一个非常重要的特性，即使它看起来很边缘，因为它允许，例如，建模操作，例如给我大于或等于以下项:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XRANGE somestream 1526985054069-0 + COUNT 1</span></span>
<span class="line"><span>1) 1) 1526985054069-0</span></span>
<span class="line"><span>   2) 1) &quot;duration&quot;</span></span>
<span class="line"><span>      2) &quot;72&quot;</span></span>
<span class="line"><span>      3) &quot;event-id&quot;</span></span>
<span class="line"><span>      4) &quot;9&quot;</span></span>
<span class="line"><span>      5) &quot;user-id&quot;</span></span>
<span class="line"><span>      6) &quot;839248&quot;</span></span></code></pre></div><p>在上面的例子中，条目1526985054069-0存在，否则服务器会发送给我们下一个条目。使用COUNT也是使用XRANGE作为迭代器的基础。</p><h5 id="迭代流" tabindex="-1">迭代流 <a class="header-anchor" href="#迭代流" aria-label="Permalink to &quot;迭代流&quot;">​</a></h5><p>为了迭代流，我们可以按照以下步骤进行。让我们假设每次迭代需要两个元素。我们开始获取前两个元素，这很简单:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XRANGE writers - + COUNT 2</span></span>
<span class="line"><span>1) 1) 1526985676425-0</span></span>
<span class="line"><span>   2) 1) &quot;name&quot;</span></span>
<span class="line"><span>      2) &quot;Virginia&quot;</span></span>
<span class="line"><span>      3) &quot;surname&quot;</span></span>
<span class="line"><span>      4) &quot;Woolf&quot;</span></span>
<span class="line"><span>2) 1) 1526985685298-0</span></span>
<span class="line"><span>   2) 1) &quot;name&quot;</span></span>
<span class="line"><span>      2) &quot;Jane&quot;</span></span>
<span class="line"><span>      3) &quot;surname&quot;</span></span>
<span class="line"><span>      4) &quot;Austen&quot;</span></span></code></pre></div><p>然后，我们不再从-开始迭代，而是使用前一次XRANGE调用返回的最后一个条目的条目ID作为独占间隔。</p><p>最后一个条目的ID是1526985685298-0，所以我们只需在它前面加上一个&#39;(&#39;，然后继续我们的迭代:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XRANGE writers (1526985685298-0 + COUNT 2</span></span>
<span class="line"><span>1) 1) 1526985691746-0</span></span>
<span class="line"><span>   2) 1) &quot;name&quot;</span></span>
<span class="line"><span>      2) &quot;Toni&quot;</span></span>
<span class="line"><span>      3) &quot;surname&quot;</span></span>
<span class="line"><span>      4) &quot;Morrison&quot;</span></span>
<span class="line"><span>2) 1) 1526985712947-0</span></span>
<span class="line"><span>   2) 1) &quot;name&quot;</span></span>
<span class="line"><span>      2) &quot;Agatha&quot;</span></span>
<span class="line"><span>      3) &quot;surname&quot;</span></span>
<span class="line"><span>      4) &quot;Christie&quot;</span></span></code></pre></div><p>等等。最终，这将允许访问流中的所有条目。显然，我们可以通过提供给定的不完整的开始ID，从任何ID开始迭代，甚至从特定的时间开始迭代。此外，我们可以通过提供结束ID或不完整ID而不是+来限制迭代到给定的ID或时间。</p><h5 id="获取单个项目" tabindex="-1">获取单个项目 <a class="header-anchor" href="#获取单个项目" aria-label="Permalink to &quot;获取单个项目&quot;">​</a></h5><p>如果您寻找XGET命令，您将会失望，因为XRANGE是有效地从流中获取单个条目的方法。你所要做的就是在XRANGE的参数中指定ID两次:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XRANGE mystream 1526984818136-0 1526984818136-0</span></span>
<span class="line"><span>1) 1) 1526984818136-0</span></span>
<span class="line"><span>   2) 1) &quot;duration&quot;</span></span>
<span class="line"><span>      2) &quot;1532&quot;</span></span>
<span class="line"><span>      3) &quot;event-id&quot;</span></span>
<span class="line"><span>      4) &quot;5&quot;</span></span>
<span class="line"><span>      5) &quot;user-id&quot;</span></span>
<span class="line"><span>      6) &quot;7782813&quot;</span></span></code></pre></div><h5 id="返回值-3" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-3" aria-label="Permalink to &quot;返回值&quot;">​</a></h5><p>数组回复，具体来说:</p><p>该命令返回id与指定范围匹配的表项。返回的条目是完整的，这意味着返回ID和由它们组成的所有字段。而且，返回的条目的字段和值与XADD添加它们的顺序完全相同。</p><h5 id="示例-5" tabindex="-1">示例 <a class="header-anchor" href="#示例-5" aria-label="Permalink to &quot;示例&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670959398-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670959877-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670960280-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670960799-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670962558-0&quot;</span></span>
<span class="line"><span>&gt; XLEN mystream</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; XRANGE mystream - + count 3</span></span>
<span class="line"><span>1) 1) &quot;1675670959398-0&quot;</span></span>
<span class="line"><span>   2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>      2) &quot;v1&quot;</span></span>
<span class="line"><span>2) 1) &quot;1675670959877-0&quot;</span></span>
<span class="line"><span>   2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>      2) &quot;v1&quot;</span></span>
<span class="line"><span>3) 1) &quot;1675670960280-0&quot;</span></span>
<span class="line"><span>   2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>      2) &quot;v1&quot;</span></span></code></pre></div><h4 id="xrevrange-倒序访问流中元素" tabindex="-1">XREVRANGE：倒序访问流中元素 <a class="header-anchor" href="#xrevrange-倒序访问流中元素" aria-label="Permalink to &quot;XREVRANGE：倒序访问流中元素&quot;">​</a></h4><ul><li>语法：<code>XREVRANGE key end start [COUNT count]</code></li></ul><p>该命令与XRANGE完全相似，但有一个显著的区别，即以相反的顺序返回条目，并且也以相反的顺序获取起始-结束范围:在XREVRANGE中，您需要先声明结束ID，然后声明开始ID，该命令将从结束端开始生成两个ID之间(或完全相同)的所有元素。</p><p>例如，要获取从高ID到低ID的所有元素，可以使用:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>XREVRANGE somestream + -</span></span></code></pre></div><p>类似地，只需要将最后一个元素添加到流中就足够了:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>XREVRANGE somestream + - COUNT 1</span></span></code></pre></div><ul><li><p>返回</p><p>数组回复，具体来说:</p><p>该命令返回ID匹配指定范围的表项，从高ID到低ID匹配。返回的条目是完整的，这意味着返回ID和由它们组成的所有字段。此外，返回的条目的字段和值与XADD添加它们的顺序完全相同。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670959398-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670959877-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670960280-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670960799-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675670962558-0&quot;</span></span>
<span class="line"><span>&gt; XLEN mystream</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; XREVRANGE mystream + - count 3</span></span>
<span class="line"><span>1) 1) &quot;1675670962558-0&quot;</span></span>
<span class="line"><span>   2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>      2) &quot;v1&quot;</span></span>
<span class="line"><span>2) 1) &quot;1675670960799-0&quot;</span></span>
<span class="line"><span>   2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>      2) &quot;v1&quot;</span></span>
<span class="line"><span>3) 1) &quot;1675670960280-0&quot;</span></span>
<span class="line"><span>   2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>      2) &quot;v1&quot;</span></span></code></pre></div><h4 id="xread-以阻塞或非阻塞方式获取流元素" tabindex="-1">XREAD：以阻塞或非阻塞方式获取流元素 <a class="header-anchor" href="#xread-以阻塞或非阻塞方式获取流元素" aria-label="Permalink to &quot;XREAD：以阻塞或非阻塞方式获取流元素&quot;">​</a></h4><ul><li>语法：<code>XREAD [COUNT count] [BLOCK milliseconds] STREAMS key [key ...] id [id ...]</code></li></ul><p>从一个或多个流读取数据，只返回ID大于调用者报告的最后接收ID的条目。该命令有一个选项，可以在项目不可用时阻塞，类似于BRPOP或BZPOPMIN等。</p><h5 id="非阻塞使用" tabindex="-1">非阻塞使用 <a class="header-anchor" href="#非阻塞使用" aria-label="Permalink to &quot;非阻塞使用&quot;">​</a></h5><p>如果没有使用BLOCK选项，则该命令是同步的，可以认为它与XRANGE有点关联:它将在流中返回一系列项，然而，即使我们只考虑同步使用，它与XRANGE有两个基本区别:</p><ul><li><p>如果我们希望同时从多个键读取，则可以使用多个流调用此命令。这是XREAD的一个关键特性，因为特别是在使用BLOCK进行阻塞时，能够侦听到多个键的单个连接是一个重要特性。</p></li><li><p>XRANGE返回一个id范围内的项，而XREAD更适合于从第一个条目开始消费流，这个条目比我们目前看到的任何其他条目都要大。所以我们传递给XREAD的是，对于每个流，我们从该流接收到的最后一个元素的ID。</p></li></ul><p>例如，如果我有两个流mystream和writer，我想从两个流中包含的第一个元素开始读取数据，我可以像下面的例子中那样调用XREAD。</p><p>注意:我们在示例中使用COUNT选项，因此对于每个流，调用将最多返回两个元素。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XREAD COUNT 2 STREAMS mystream writers 0-0 0-0</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) 1526984818136-0</span></span>
<span class="line"><span>         2) 1) &quot;duration&quot;</span></span>
<span class="line"><span>            2) &quot;1532&quot;</span></span>
<span class="line"><span>            3) &quot;event-id&quot;</span></span>
<span class="line"><span>            4) &quot;5&quot;</span></span>
<span class="line"><span>            5) &quot;user-id&quot;</span></span>
<span class="line"><span>            6) &quot;7782813&quot;</span></span>
<span class="line"><span>      2) 1) 1526999352406-0</span></span>
<span class="line"><span>         2) 1) &quot;duration&quot;</span></span>
<span class="line"><span>            2) &quot;812&quot;</span></span>
<span class="line"><span>            3) &quot;event-id&quot;</span></span>
<span class="line"><span>            4) &quot;9&quot;</span></span>
<span class="line"><span>            5) &quot;user-id&quot;</span></span>
<span class="line"><span>            6) &quot;388234&quot;</span></span>
<span class="line"><span>2) 1) &quot;writers&quot;</span></span>
<span class="line"><span>   2) 1) 1) 1526985676425-0</span></span>
<span class="line"><span>         2) 1) &quot;name&quot;</span></span>
<span class="line"><span>            2) &quot;Virginia&quot;</span></span>
<span class="line"><span>            3) &quot;surname&quot;</span></span>
<span class="line"><span>            4) &quot;Woolf&quot;</span></span>
<span class="line"><span>      2) 1) 1526985685298-0</span></span>
<span class="line"><span>         2) 1) &quot;name&quot;</span></span>
<span class="line"><span>            2) &quot;Jane&quot;</span></span>
<span class="line"><span>            3) &quot;surname&quot;</span></span>
<span class="line"><span>            4) &quot;Austen&quot;</span></span></code></pre></div><p>STREAMS选项是强制的，必须是最后一个选项，因为这个选项的参数长度是可变的，格式如下:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>STREAMS key_1 key_2 key_3 ... key_N ID_1 ID_2 ID_3 ... ID_N</span></span></code></pre></div><p>因此，我们从一个键列表开始，然后继续使用所有相关的ID，表示我们为该流接收到的最后一个ID，因此调用将只为我们提供来自同一流的较大ID。</p><p>例如，在上面的例子中，流mystream接收到的最后一个项的ID为1526999352406-0，而流writer的ID为1526985685298-0。</p><p>为了继续迭代这两个流，我将调用:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XREAD COUNT 2 STREAMS mystream writers 1526999352406-0 1526985685298-0</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) 1526999626221-0</span></span>
<span class="line"><span>         2) 1) &quot;duration&quot;</span></span>
<span class="line"><span>            2) &quot;911&quot;</span></span>
<span class="line"><span>            3) &quot;event-id&quot;</span></span>
<span class="line"><span>            4) &quot;7&quot;</span></span>
<span class="line"><span>            5) &quot;user-id&quot;</span></span>
<span class="line"><span>            6) &quot;9488232&quot;</span></span>
<span class="line"><span>2) 1) &quot;writers&quot;</span></span>
<span class="line"><span>   2) 1) 1) 1526985691746-0</span></span>
<span class="line"><span>         2) 1) &quot;name&quot;</span></span>
<span class="line"><span>            2) &quot;Toni&quot;</span></span>
<span class="line"><span>            3) &quot;surname&quot;</span></span>
<span class="line"><span>            4) &quot;Morrison&quot;</span></span>
<span class="line"><span>      2) 1) 1526985712947-0</span></span>
<span class="line"><span>         2) 1) &quot;name&quot;</span></span>
<span class="line"><span>            2) &quot;Agatha&quot;</span></span>
<span class="line"><span>            3) &quot;surname&quot;</span></span>
<span class="line"><span>            4) &quot;Christie&quot;</span></span></code></pre></div><p>等等。最终，调用将不会返回任何项，而只是一个空数组，然后我们知道没有更多的东西可以从我们的流中获取(并且我们将不得不重试操作，因此该命令也支持阻塞模式)。</p><h5 id="不完整的id-1" tabindex="-1">不完整的id <a class="header-anchor" href="#不完整的id-1" aria-label="Permalink to &quot;不完整的id&quot;">​</a></h5><p>使用不完整的id是有效的，就像使用XRANGE一样。然而，在这里，ID的序列部分，如果缺失，总是被解释为零，因此命令: <code>&gt; XREAD COUNT 2 STREAMS mystream writers 0 0</code>完全等价于<code>&gt; XREAD COUNT 2 STREAMS mystream writers 0-0 0-0</code>。</p><h5 id="阻塞数据" tabindex="-1">阻塞数据 <a class="header-anchor" href="#阻塞数据" aria-label="Permalink to &quot;阻塞数据&quot;">​</a></h5><p>在其同步形式中，只要有更多可用项，该命令就可以获得新数据。但是，在某些时候，我们必须等待数据生产者使用XADD将新条目推入我们正在使用的流中。为了避免在固定或自适应的时间间隔内轮询，该命令可以根据指定的流和id在无法返回任何数据时阻塞，并在请求的键之一接受数据时自动取消阻塞。</p><p>重要的是要理解这个命令扇形到等待相同范围id的所有客户端，因此每个消费者都将获得数据的从服务器，这与使用阻塞列表弹出操作时发生的情况不同。</p><p>为了阻塞，我们使用了block选项，以及在超时前我们想要阻塞的毫秒数。通常情况下，Redis阻塞命令的超时时间以秒为单位，但是这个命令的超时时间为毫秒，即使正常情况下服务器的超时决议接近0.1秒。这一次，在某些用例中阻塞的时间可能会更短，如果服务器内部结构随着时间的推移而改进，则超时的决议可能会提高。</p><p>当传递BLOCK命令时，但在传递的流中至少有一个要返回的数据，该命令将同步执行，就像缺少BLOCK选项一样。</p><p>这是一个阻塞调用的例子，命令稍后返回一个空应答，因为超时已经过去，没有新的数据到达:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XREAD BLOCK 1000 STREAMS mystream 1526999626221-0</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div><h5 id="特殊的-id" tabindex="-1">特殊的$ ID <a class="header-anchor" href="#特殊的-id" aria-label="Permalink to &quot;特殊的$ ID&quot;">​</a></h5><p>阻塞时，有时我们希望只接收从阻塞时开始通过XADD添加到流中的条目。在这种情况下，我们对已经添加的条目的历史不感兴趣。对于这个用例，我们必须检查流顶部元素ID，并在XREAD命令行中使用该ID。这并不干净，需要调用其他命令，因此可以使用特殊的$ ID向流发出信号，表明我们只想要新东西。</p><p>很重要的一点是，您应该只在第一次调用XREAD时使用$ ID。稍后，ID应该是流中最后报告的项之一，否则您可能会错过在这中间添加的所有条目。</p><p>这是一个典型的XREAD调用在消费者只消费新条目的第一次迭代中的样子:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XREAD BLOCK 5000 COUNT 100 STREAMS mystream $</span></span></code></pre></div><p>一旦我们得到一些回复，下一个电话将是这样的:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XREAD BLOCK 5000 COUNT 100 STREAMS mystream 1526999644174-3</span></span></code></pre></div><p>等等。</p><h5 id="如何为单个流上阻塞的多个客户端提供服务" tabindex="-1">如何为单个流上阻塞的多个客户端提供服务 <a class="header-anchor" href="#如何为单个流上阻塞的多个客户端提供服务" aria-label="Permalink to &quot;如何为单个流上阻塞的多个客户端提供服务&quot;">​</a></h5><p>列表或排序集上的阻塞列表操作具有弹出行为。基本上，元素从列表或排序集中删除，以便返回给客户端。在这个场景中，您希望以公平的方式使用项，这取决于客户机阻塞给定密钥到达的时间。通常Redis在这个用例中使用FIFO语义。</p><p>但是请注意，对于流，这不是一个问题:当客户端被服务时，流条目不会从流中删除，因此只要XADD命令向流提供数据，每个等待的客户端都将被服务。</p><h5 id="返回值-4" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-4" aria-label="Permalink to &quot;返回值&quot;">​</a></h5><p>数组回复，具体来说:</p><p>该命令返回一个结果数组:返回数组的每个元素都是由两个元素组成的数组，其中包含键名和为该键报告的条目。报告的条目是完整的流条目，具有id和所有字段和值的列表。字段和值的报告顺序保证与XADD添加时相同。</p><p>当使用BLOCK时，超时时返回空应答。</p><h5 id="示例-6" tabindex="-1">示例 <a class="header-anchor" href="#示例-6" aria-label="Permalink to &quot;示例&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675737504264-0&quot;</span></span>
<span class="line"><span>&gt; XREAD streams mystream 0</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675737504264-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XREAD streams mystream $</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675737551381-0&quot;</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675737553717-0&quot;</span></span>
<span class="line"><span>&gt; XREAD count 2 streams mystream 0</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675737504264-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>      2) 1) &quot;1675737551381-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; XREAD block 1000 streams mystream $</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>(1.09s)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; XREAD block 5000 streams mystream $</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675738127844-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k2&quot;</span></span>
<span class="line"><span>            2) &quot;v2&quot;</span></span>
<span class="line"><span>(3.09s)</span></span>
<span class="line"><span>other&gt; XADD mystream * k2 v2</span></span>
<span class="line"><span>&quot;1675738127844-0&quot;</span></span>
<span class="line"><span>other&gt; XADD mystream * k2 v2</span></span>
<span class="line"><span>&quot;1675738129139-0&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; XADD mystream1 * k1 v1</span></span>
<span class="line"><span>&quot;1675739914536-0&quot;</span></span>
<span class="line"><span>&gt; XREAD count 2 streams mystream mystream1 0 0</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675737504264-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>      2) 1) &quot;1675737551381-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>2) 1) &quot;mystream1&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675739914536-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; XREAD block 10000 streams mystream mystream1 $ $</span></span>
<span class="line"><span>1) 1) &quot;mystream1&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675740032559-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>(4.85s)</span></span>
<span class="line"><span>other&gt; XADD mystream1 * k1 v1</span></span>
<span class="line"><span>&quot;1675740032559-0&quot;</span></span>
<span class="line"><span>other&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675740036194-0&quot;</span></span></code></pre></div><h4 id="消费者组" tabindex="-1">消费者组 <a class="header-anchor" href="#消费者组" aria-label="Permalink to &quot;消费者组&quot;">​</a></h4><p>当手头的任务是使用来自不同客户端的相同流时，XREAD已经提供了一种向外扇到N个客户端的方法，可能还使用从服务器以提供更多的读取可伸缩性。然而，在某些问题中，我们想做的不是向许多客户端提供相同的消息流，而是向许多客户端提供来自同一流的不同消息子集。一个明显的有用的例子是处理速度较慢的消息:有N个不同的工作人员接收流的不同部分的能力允许我们扩展消息处理，通过将不同的消息路由到准备做更多工作的不同工作人员。</p><p>基本的消费组命令如下:</p><ul><li><p>XGROUP用于创建、销毁和管理用户组。</p></li><li><p>XREADGROUP用于通过消费组从流中读取。</p></li><li><p>XACK是允许使用者将挂起的消息标记为正确处理的命令。</p></li></ul><h5 id="xgroup-create-创建消费者组" tabindex="-1">XGROUP CREATE：创建消费者组 <a class="header-anchor" href="#xgroup-create-创建消费者组" aria-label="Permalink to &quot;XGROUP CREATE：创建消费者组&quot;">​</a></h5><ul><li>语法：<code>XGROUP CREATE key groupname &lt;id | $&gt; [MKSTREAM] [ENTRIESREAD entries_read]</code></li></ul><p>为存储在&lt;<code>key</code>&gt;的流创建一个由&lt;<code>groupname</code>&gt;唯一标识的新消费者组。</p><p>在给定的流中，每个组都有一个唯一的名称。如果已经存在同名的用户组，则该命令返回-BUSYGROUP错误。</p><p>命令的&lt;<code>id</code>&gt;参数指定从新组的透视图来看流中最后交付的条目。特殊ID $是流中最后一个条目的ID，但是您可以用任何有效的ID替换它。</p><p>例如，如果你想让组的消费者从开始获取整个流，使用0作为消费者组的起始ID:<code>XGROUP CREATE mystream mygroup 0</code></p><p>默认情况下，<code>XGROUP CREATE</code>命令期望目标流存在，如果不存在则返回错误。如果一个流不存在，你可以使用可选的MKSTREAM子命令作为&lt;<code>id</code>&gt;后的最后一个参数自动创建长度为0的流:<code>XGROUP CREATE mystream mygroup $ MKSTREAM</code></p><p>要启用消费者组延迟跟踪，请使用任意ID指定可选的entries_read参数。任意ID是流的第一个条目、最后一个条目或零(“0-0”)ID以外的任何ID。使用它来找出任意ID(不包括它)和流的最后一个条目之间有多少条目。设置entries_read流的entries_added减去条目数。</p><ul><li><p>返回</p><p>简单的字符串回答:成功就OK。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span></code></pre></div><h5 id="xgroup-setid-修改消费者组的最后递送消息id" tabindex="-1">XGROUP SETID：修改消费者组的最后递送消息ID <a class="header-anchor" href="#xgroup-setid-修改消费者组的最后递送消息id" aria-label="Permalink to &quot;XGROUP SETID：修改消费者组的最后递送消息ID&quot;">​</a></h5><ul><li>语法：<code>XGROUP SETID key groupname &lt;id | $&gt; [ENTRIESREAD entries_read]</code></li></ul><p>设置消费者组的最后一个交付ID。</p><p>通常，使用XGROUP CREATE创建组时设置消费者组的最后一个交付ID。XGROUP SETID命令允许修改组的最后一个交付ID，而不必删除和重新创建组。例如，如果你想让消费者组中的消费者重新处理流中的所有消息，你可能想将其下一个ID设置为0:<code>XGROUP SETID mystream mygroup 0</code></p><p>可选的entries_read参数可以指定为任意ID启用消费者组延迟跟踪。任意ID是流的第一个条目、最后一个条目或零(“0-0”)ID以外的任何ID。这很有用，因为您可以准确地知道在任意ID(不包括它)和流的最后一个条目之间有多少条目。在这种情况下，可以将entries_read设置为流的entries_added减去条目数。</p><ul><li><p>返回</p><p>简单的字符串回答:成功就OK。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XGROUP SETID mystream mygroup 0</span></span>
<span class="line"><span>OK</span></span></code></pre></div><h5 id="xgroup-createconsumer-创建消费者" tabindex="-1">XGROUP CREATECONSUMER：创建消费者 <a class="header-anchor" href="#xgroup-createconsumer-创建消费者" aria-label="Permalink to &quot;XGROUP CREATECONSUMER：创建消费者&quot;">​</a></h5><ul><li>语法：<code>XGROUP CREATECONSUMER key groupname consumername</code></li></ul><p>在存储在&lt;<code>key</code>&gt;的流的消费者组&lt;<code>groupname</code>&gt;中创建一个名为&lt;<code>consumername</code>&gt;的消费者。</p><p>当一个操作(比如XREADGROUP)引用一个不存在的消费者时，也会自动创建消费者。只有当流中有数据时，这才对XREADGROUP有效。</p><ul><li><p>返回</p><p>整数回复:已创建的消费者数量(0或1)</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATECONSUMER mystream mygroup myconsumer</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre></div><h5 id="xreadgroup-group-读取消费者组" tabindex="-1">XREADGROUP GROUP：读取消费者组 <a class="header-anchor" href="#xreadgroup-group-读取消费者组" aria-label="Permalink to &quot;XREADGROUP GROUP：读取消费者组&quot;">​</a></h5><ul><li>语法：<code>XREADGROUP GROUP group consumer [COUNT count] [BLOCK milliseconds] [NOACK] STREAMS key [key ...] id [id ...]</code></li></ul><p>XREADGROUP命令是支持使用者组的XREAD命令的特殊版本。在阅读本页之前，您可能必须先理解XREAD命令。</p><p>此命令与普通XREAD之间的区别在于，该命令支持使用者组。</p><p>如果没有消费者组，只使用XREAD，则所有客户端都将使用流中的所有条目进行服务。而使用XREADGROUP的消费者组，可以创建客户端组，这些客户端组使用到达给定流的消息的不同部分。例如，如果流获得新条目A、B和C，并且有两个消费者通过消费者组读取，那么一个客户端将获得消息A和C，另一个客户端将获得消息B，依此类推。</p><p>在消费者组中，给定的消费者(即从流中消费消息的客户端)必须使用唯一的消费者名称进行标识。它只是一个字符串。</p><p>消费者组的保证之一是，给定的消费者只能看到传递给它的消息的历史，因此消息只有一个所有者。但是，有一个称为消息声明的特殊功能，允许其他消费者在某些消费者出现不可恢复的故障时声明消息。为了实现这样的语义，使用者组需要通过XACK命令显式地确认使用者成功处理的消息。这是必需的，因为对于每个消费者组，流将跟踪谁正在处理什么消息。</p><p>下面是如何理解你是否想要使用一个消费者组:</p><ol><li><p>如果您有一个流和多个客户端，并且希望所有客户端获得所有消息，则不需要消费者组。</p></li><li><p>如果您有一个流和多个客户端，并且希望跨客户端对流进行分区或分片，以便每个客户端将获得流中到达的消息的一个子集，那么您需要一个消费者组。</p></li></ol><h6 id="xread和xreadgroup之间的区别" tabindex="-1">XREAD和XREADGROUP之间的区别 <a class="header-anchor" href="#xread和xreadgroup之间的区别" aria-label="Permalink to &quot;XREAD和XREADGROUP之间的区别&quot;">​</a></h6><p>从语法的角度来看，这些命令几乎是相同的，但是XREADGROUP需要一个特殊的强制性选项:<code>GROUP &lt;group-name&gt; &lt;consumer-name&gt;</code></p><p>组名只是与流关联的使用者组的名称。组是使用XGROUP命令创建的。使用者名称是客户端用来在组中标识自身的字符串。消费者是在消费者组中第一次看到时自动创建的。不同的客户端应该选择不同的使用者名。</p><p>当您使用XREADGROUP进行读取时，服务器将记住已传递给您的给定消息:该消息将存储在消费者组中所谓的Pending Entries List (PEL)中，这是一个已传递但尚未确认的消息id列表。</p><p>客户端必须使用XACK确认消息处理，以便从PEL中删除挂起的条目。可以使用XPENDING命令检查PEL。</p><p>可以使用NOACK子命令来避免在不需要可靠性且偶尔消息丢失是可以接受的情况下向PEL添加消息。这相当于在读取消息时确认消息。</p><p>使用XREADGROUP时在STREAMS选项中指定的ID可以是以下两个之一:</p><ul><li><p>特殊的&gt; ID，这意味着使用者只想接收从未传递给任何其他使用者的消息。意思是，给我新的信息。</p></li><li><p>任何其他ID，即0或任何其他有效ID或不完整ID(仅为毫秒时间部分)，将具有为发送命令的消费者返回ID大于所提供ID的待处理条目的效果。因此，基本上如果ID不是&gt;，那么该命令将只允许客户端访问其挂起的条目:传递给它但尚未确认的消息。注意，在这种情况下，BLOCK和NOACK都被忽略。</p></li></ul><p>像XREAD一样，XREADGROUP命令可以以阻塞的方式使用。在这方面没有区别。</p><h6 id="当消息传递给消费者时会发生什么" tabindex="-1">当消息传递给消费者时会发生什么? <a class="header-anchor" href="#当消息传递给消费者时会发生什么" aria-label="Permalink to &quot;当消息传递给消费者时会发生什么?&quot;">​</a></h6><ol><li><p>如果消息从未交付给任何人，也就是说，如果我们谈论的是一条新消息，那么将创建一个PEL (Pending Entries List)。</p></li><li><p>如果消息已经交付给该使用者，并且它只是再次重新获取相同的消息，那么最后一个交付计数器将更新为当前时间，并且交付的数量将增加1。您可以使用XPENDING命令访问这些消息属性。</p></li></ol><h6 id="删除挂起的消息时会发生什么" tabindex="-1">删除挂起的消息时会发生什么? <a class="header-anchor" href="#删除挂起的消息时会发生什么" aria-label="Permalink to &quot;删除挂起的消息时会发生什么?&quot;">​</a></h6><p>在任何时候，由于修改或显式调用XDEL，条目都可能从流中删除。根据设计，Redis不会阻止删除流的bpel中存在的条目。当发生这种情况时，bpel保留已删除条目的id，但实际的条目有效负载不再可用。因此，当读取这样的PEL条目时，Redis将返回一个空值来代替它们各自的数据。</p><p>例如：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XADD mystream 1 myfield mydata</span></span>
<span class="line"><span>&quot;1-0&quot;</span></span>
<span class="line"><span>&gt; XGROUP CREATE mystream mygroup 0</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XREADGROUP GROUP mygroup myconsumer STREAMS mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;myfield&quot;</span></span>
<span class="line"><span>            2) &quot;mydata&quot;</span></span>
<span class="line"><span>&gt; XDEL mystream 1-0</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; XREADGROUP GROUP mygroup myconsumer STREAMS mystream 0</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1-0&quot;</span></span>
<span class="line"><span>         2) (nil)</span></span></code></pre></div><h6 id="返回值-5" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-5" aria-label="Permalink to &quot;返回值&quot;">​</a></h6><p>数组回复，具体来说:</p><p>该命令返回一个结果数组:返回数组的每个元素都是由两个元素组成的数组，其中包含键名和为该键报告的条目。报告的条目是完整的流条目，具有id和所有字段和值的列表。字段和值的报告顺序保证与XADD添加时相同。</p><p>当使用BLOCK时，超时时返回空应答。</p><h6 id="示例-7" tabindex="-1">示例 <a class="header-anchor" href="#示例-7" aria-label="Permalink to &quot;示例&quot;">​</a></h6><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675932530320-0&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675932530320-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream 0</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675932530320-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span></code></pre></div><h5 id="xack-消息的状态转换" tabindex="-1">XACK：消息的状态转换 <a class="header-anchor" href="#xack-消息的状态转换" aria-label="Permalink to &quot;XACK：消息的状态转换&quot;">​</a></h5><ul><li>语法：<code>XACK key group id [id ...]</code></li></ul><p>XACK命令从流使用者组的Pending Entries List (PEL)中删除一条或多条消息。当消息被传递给某个消费者时(通常作为调用XREADGROUP的副作用)，或者当消费者获得调用XCLAIM的消息的所有权时，消息处于挂起状态，因此存储在PEL中。挂起的消息已传递给某个使用者，但服务器还不能确定它至少被处理了一次。因此，对XREADGROUP的新调用以获取消费者的消息历史记录(例如使用ID为0)将返回这样的消息。类似地，检查PEL的XPENDING命令将列出挂起的消息。</p><p>一旦使用者成功处理了一条消息，它应该调用XACK，这样该消息就不会再次被处理，作为副作用，关于该消息的PEL条目也会被清除，从而从Redis服务器释放内存。</p><ul><li><p>返回</p><p>整数回复，具体为:</p><p>该命令返回成功确认的消息数。某些消息id可能不再是PEL的一部分(例如，因为它们已经被确认)，XACK将不会将它们算作已成功确认。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675932530320-0&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675932530320-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XACK mystream mygroup 1675932530320-0</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream 0</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) (empty array)</span></span></code></pre></div><h5 id="xpending-显示待处理消息的相关信息" tabindex="-1">XPENDING：显示待处理消息的相关信息 <a class="header-anchor" href="#xpending-显示待处理消息的相关信息" aria-label="Permalink to &quot;XPENDING：显示待处理消息的相关信息&quot;">​</a></h5><ul><li>语法：<code>XPENDING key group [[IDLE min-idle-time] start end count [consumer]]</code></li></ul><p>通过消费者组从流中获取数据，而不确认这样的数据，会产生创建挂起条目的效果。这在XREADGROUP命令中有很好的解释，在我们对Redis Streams的介绍中有更好的解释。XACK命令将立即从pending Entries List (PEL)中删除挂起的条目，因为一旦消息被成功处理，消费者组就不再需要跟踪它并记住消息的当前所有者。</p><p>XPENDING命令是用于检查挂起消息列表的接口，因此它是一个非常重要的命令，可以观察和理解流消费者组中发生了什么:哪些客户端处于活动状态，哪些消息挂起等待消费，或者查看是否有空闲消息。</p><p>此外，此命令与XCLAIM一起用于实现长时间出现故障的消费者的恢复，从而导致某些消息得不到处理:不同的消费者可以声明该消息并继续。这在流介绍和XCLAIM命令页中有更好的解释，这里不做介绍。</p><h6 id="xpending总结" tabindex="-1">XPENDING总结 <a class="header-anchor" href="#xpending总结" aria-label="Permalink to &quot;XPENDING总结&quot;">​</a></h6><p>当只使用键名和使用者组名调用XPENDING时，它只输出给定使用者组中挂起消息的摘要。在下面的示例中，我们创建了一个消费者组，并通过使用XREADGROUP从该组读取消息来立即创建一条待处理消息。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream group55 0-0</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; XREADGROUP GROUP group55 consumer-123 COUNT 1 STREAMS mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) 1526984818136-0</span></span>
<span class="line"><span>         2) 1) &quot;duration&quot;</span></span>
<span class="line"><span>            2) &quot;1532&quot;</span></span>
<span class="line"><span>            3) &quot;event-id&quot;</span></span>
<span class="line"><span>            4) &quot;5&quot;</span></span>
<span class="line"><span>            5) &quot;user-id&quot;</span></span>
<span class="line"><span>            6) &quot;7782813&quot;</span></span></code></pre></div><p>我们期望消费者组group55的待处理条目列表现在有一条消息:名为consumer-123的消费者获取了消息，但没有确认其处理。简单的XPENDING表单将为我们提供以下信息:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XPENDING mystream group55</span></span>
<span class="line"><span>1) (integer) 1</span></span>
<span class="line"><span>2) 1526984818136-0</span></span>
<span class="line"><span>3) 1526984818136-0</span></span>
<span class="line"><span>4) 1) 1) &quot;consumer-123&quot;</span></span>
<span class="line"><span>      2) &quot;1&quot;</span></span></code></pre></div><p>在这种形式中，该命令输出此消费者组的待定消息总数(为1)，后面是待定消息中最小和最大的ID，然后列出至少有一条待定消息的消费者组中的每个消费者及其拥有的待定消息的数量。</p><h6 id="xpending延伸" tabindex="-1">XPENDING延伸 <a class="header-anchor" href="#xpending延伸" aria-label="Permalink to &quot;XPENDING延伸&quot;">​</a></h6><p>摘要提供了一个很好的概述，但有时我们对细节感兴趣。为了查看所有带有更多相关信息的挂起消息，我们还需要传递一个id范围，以类似的方式，我们使用XRANGE和一个不可选的count参数来限制每次调用返回的消息数量:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XPENDING mystream group55 - + 10</span></span>
<span class="line"><span>1) 1) 1526984818136-0</span></span>
<span class="line"><span>   2) &quot;consumer-123&quot;</span></span>
<span class="line"><span>   3) (integer) 196415</span></span>
<span class="line"><span>   4) (integer) 1</span></span></code></pre></div><p>在扩展表单中，我们不再看到摘要信息，取而代之的是挂起条目列表中每个消息的详细信息。对于每条消息返回四个属性:</p><ol><li><p>消息的ID。</p></li><li><p>获取消息且仍需确认的使用者的名称。我们称它为消息的当前所有者。</p></li><li><p>自此消息最后一次交付给此使用者以来所经过的毫秒数。</p></li><li><p>传递此消息的次数。</p></li></ol><p>传递计数器是数组中的第四个元素，当其他一些消费者使用XCLAIM声明消息时，或者当访问消费者组中的消费者的历史记录时，通过XREADGROUP再次传递消息时(有关详细信息，请参阅XREADGROUP页面)，传递计数器会递增。</p><p>可以向命令传递一个额外的参数，以查看具有特定所有者的消息:<code>&gt; XPENDING mystream group55 - + 10 consumer-123</code></p><p>但在上面的情况下，输出将是相同的，因为我们只有单个消费者的挂起消息。然而，重要的是要记住，即使有来自多个消费者的许多待处理消息，这种由特定消费者筛选的操作也不是低效的:我们有一个全局和每个消费者的待处理条目列表数据结构，因此我们可以非常有效地仅显示单个消费者的待处理消息。</p><h6 id="空闲时间过滤器" tabindex="-1">空闲时间过滤器 <a class="header-anchor" href="#空闲时间过滤器" aria-label="Permalink to &quot;空闲时间过滤器&quot;">​</a></h6><p>也可以通过它们的空闲时间来过滤挂起的流条目，以毫秒为单位(对于没有处理过一段时间的xclaim条目很有用):</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XPENDING mystream group55 IDLE 9000 - + 10</span></span>
<span class="line"><span>&gt; XPENDING mystream group55 IDLE 9000 - + 10 consumer-123</span></span></code></pre></div><p>第一种情况将返回整个组中空闲超过9秒的前10个(或更少)PEL条目，而第二种情况只返回consumer-123的PEL条目。</p><h6 id="独占范围和迭代pel" tabindex="-1">独占范围和迭代PEL <a class="header-anchor" href="#独占范围和迭代pel" aria-label="Permalink to &quot;独占范围和迭代PEL&quot;">​</a></h6><p>XPENDING命令允许迭代挂起的条目，就像XRANGE和XREVRANGE允许流的条目一样。为此，您可以在最后一次读取挂起条目的ID前加上(字符，表示一个开放(独占)范围，并在随后的命令调用中证明它。</p><h6 id="返回值-6" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-6" aria-label="Permalink to &quot;返回值&quot;">​</a></h6><pre><code>数组回复，具体来说:

该命令根据调用的方式以不同的格式返回数据，如本页前面所述。然而，回复总是一个数组的项目。
</code></pre><h6 id="示例-8" tabindex="-1">示例 <a class="header-anchor" href="#示例-8" aria-label="Permalink to &quot;示例&quot;">​</a></h6><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675995126989-0&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675995126989-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup</span></span>
<span class="line"><span>1) (integer) 1</span></span>
<span class="line"><span>2) &quot;1675995126989-0&quot;</span></span>
<span class="line"><span>3) &quot;1675995126989-0&quot;</span></span>
<span class="line"><span>4) 1) 1) &quot;myconsumer&quot;</span></span>
<span class="line"><span>      2) &quot;1&quot;</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup - + 1</span></span>
<span class="line"><span>1) 1) &quot;1675995126989-0&quot;</span></span>
<span class="line"><span>   2) &quot;myconsumer&quot;</span></span>
<span class="line"><span>   3) (integer) 152871</span></span>
<span class="line"><span>   4) (integer) 1</span></span>
<span class="line"><span>&gt; XACK mystream mygroup 1675995126989-0</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup</span></span>
<span class="line"><span>1) (integer) 0</span></span>
<span class="line"><span>2) (nil)</span></span>
<span class="line"><span>3) (nil)</span></span>
<span class="line"><span>4) (nil)</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup - + 1</span></span>
<span class="line"><span>(empty array)</span></span></code></pre></div><h5 id="xclaim-转移消息的归属权" tabindex="-1">XCLAIM：转移消息的归属权 <a class="header-anchor" href="#xclaim-转移消息的归属权" aria-label="Permalink to &quot;XCLAIM：转移消息的归属权&quot;">​</a></h5><ul><li><p>语法：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>XCLAIM key group consumer min-idle-time id [id ...] [IDLE ms]</span></span>
<span class="line"><span>[TIME unix-time-milliseconds] [RETRYCOUNT count] [FORCE] [JUSTID]</span></span>
<span class="line"><span>[LASTID id]</span></span></code></pre></div></li></ul><p>在流使用者组的上下文中，此命令更改挂起消息的所有权，以便新的所有者是作为命令参数指定的使用者。通常情况是这样的:</p><ol><li><p>有一个与消费者组相关联的流。</p></li><li><p>某个消费者A在该消费者组的上下文中通过XREADGROUP从流中读取消息。</p></li><li><p>作为副作用，在消费者组的pending Entries List (PEL)中创建了一个pending消息条目:这意味着消息已交付给给定的消费者，但尚未通过XACK进行确认。</p></li><li><p>然后突然之间，消费者永远地失败了。</p></li><li><p>其他使用者可能会使用XPENDING命令检查挂起的消息列表，这些消息已经过期很长时间了。为了继续处理此类消息，它们使用XCLAIM获取消息的所有权并继续。使用者还可以使用XAUTOCLAIM命令自动扫描和声明过期的待处理消息。</p></li></ol><p>注意，只有当消息的空闲时间大于我们在调用XCLAIM时指定的最小空闲时间时，消息才会被声明。作为副作用，XCLAIM还将重置空闲时间(因为这是处理消息的新尝试)，两个试图同时声明消息的消费者永远不会同时成功:只有一个会成功声明消息。这避免了我们以简单的方式多次处理给定的消息(然而在一般情况下，多次处理是可能的，也是不可避免的)。</p><p>此外，作为副作用，XCLAIM将增加尝试传递消息的计数，除非指定了JUSTID选项(仅传递消息ID，而不传递消息本身)。通过这种方式，由于某种原因(例如由于消费者试图处理它们时崩溃)而无法处理的消息将开始具有更大的计数器，并可以在系统内部检测到。</p><p>XCLAIM在以下情况下不会声明消息:</p><ol><li><p>消息在组PEL中不存在(即它从未被任何消费者读取)</p></li><li><p>消息存在于组PEL中，但不存在于流本身(即消息被读取但从未被确认，然后通过修剪或XDEL从流中删除)</p></li></ol><p>在这两种情况下，回复都不会包含与该消息对应的条目(即，回复数组的长度可能小于提供给XCLAIM的id的数量)。在后一种情况下，消息也将从发现它的PEL中删除。该特性是在Redis 7.0中引入的。</p><h6 id="命令选项" tabindex="-1">命令选项 <a class="header-anchor" href="#命令选项" aria-label="Permalink to &quot;命令选项&quot;">​</a></h6><p>该命令有多个选项，但大多数主要用于内部使用，以便将XCLAIM或其他命令的效果传输到AOF文件，并将相同的效果传播到从服务器，并且不太可能对普通用户有用:</p><ol><li><p>IDLE &lt;<code>ms</code>&gt;:设置消息的空闲时间(最后一次发送)。如果没有指定IDLE，则假设IDLE为0，也就是说，时间计数将被重置，因为消息现在有一个新的所有者试图处理它。</p></li><li><p>TIME &lt;<code>ms-unix-time</code>&gt;:这与IDLE相同，但不是相对的毫秒数，它将空闲时间设置为特定的Unix时间(以毫秒为单位)。这对于重写生成XCLAIM命令的AOF文件非常有用。</p></li><li><p>RETRYCOUNT &lt;<code>count</code>&gt;:设置重试次数为指定值。每当再次传递消息时，此计数器都会增加。通常XCLAIM不会改变这个计数器，它只在调用XPENDING命令时提供给客户端:这样客户端就可以检测到异常情况，比如在尝试大量传递后由于某种原因从未处理过的消息。</p></li><li><p>FORCE:在PEL中创建挂起的消息条目，即使某些指定的id还没有在分配给不同客户端的PEL中。但是消息必须在流中存在，否则不存在的消息id将被忽略。</p></li><li><p>JUSTID:只返回成功声明的消息的id数组，而不返回实际的消息。使用此选项意味着重试计数器不增加。</p></li></ol><h6 id="返回值-7" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-7" aria-label="Permalink to &quot;返回值&quot;">​</a></h6><pre><code>数组回复，具体来说:

该命令以与XRANGE相同的格式返回成功声明的所有消息。但是，如果指定了JUSTID选项，则只报告消息id，而不包括实际的消息。
</code></pre><h6 id="示例-9" tabindex="-1">示例 <a class="header-anchor" href="#示例-9" aria-label="Permalink to &quot;示例&quot;">​</a></h6><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1675996748819-0&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1675996748819-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup - + 1</span></span>
<span class="line"><span>1) 1) &quot;1675996748819-0&quot;</span></span>
<span class="line"><span>   2) &quot;myconsumer&quot;</span></span>
<span class="line"><span>   3) (integer) 41631</span></span>
<span class="line"><span>   4) (integer) 1</span></span>
<span class="line"><span>&gt; XCLAIM mystream mygroup myconsumer1 40000 1675996748819-0</span></span>
<span class="line"><span>1) 1) &quot;1675996748819-0&quot;</span></span>
<span class="line"><span>   2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>      2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup - + 1</span></span>
<span class="line"><span>1) 1) &quot;1675996748819-0&quot;</span></span>
<span class="line"><span>   2) &quot;myconsumer1&quot;</span></span>
<span class="line"><span>   3) (integer) 3376</span></span>
<span class="line"><span>   4) (integer) 2</span></span></code></pre></div><h5 id="xautoclaim-自动转移消息的归属权" tabindex="-1">XAUTOCLAIM：自动转移消息的归属权 <a class="header-anchor" href="#xautoclaim-自动转移消息的归属权" aria-label="Permalink to &quot;XAUTOCLAIM：自动转移消息的归属权&quot;">​</a></h5><ul><li>语法：<code>XAUTOCLAIM key group consumer min-idle-time start [COUNT count] [JUSTID]</code></li></ul><p>此命令转移匹配指定条件的挂起流条目的所有权。从概念上讲，XAUTOCLAIM等同于调用XPENDING，然后调用XCLAIM，但是通过类似scan的语义提供了一种更直接的方法来处理消息传递失败。</p><p>与XCLAIM类似，该命令对&lt;键&gt;处的流项和所提供的&lt;组&gt;上下文中的流项进行操作。它将待处理消息的所有权转移到&lt;消费者&gt;，时间超过&lt;<code>min-idle-time</code>&gt;毫秒，且ID等于或大于&lt;<code>start</code>&gt;。</p><p>可选的&lt;<code>count</code>&gt;参数默认为100，是命令试图声明的条目数量的上限。在内部，该命令从&lt;<code>start</code>&gt;开始扫描消费者组的Pending Entries List (PEL)，并过滤出空闲时间小于或等于&lt;<code>min-idle-time</code>&gt;的条目。命令扫描的挂起条目的最大数量是&lt;<code>count</code>&gt;的值乘以10(硬编码)的乘积。因此，声明的条目数量可能小于指定的值。</p><p>可选的JUSTID参数将回复更改为仅返回成功声明的消息的id数组，而不返回实际的消息。使用此选项意味着重试计数器不增加。</p><p>该命令将声明的条目作为数组返回。它还返回一个流ID，用于类似游标的用途，作为后续调用的&lt;<code>start</code>&gt;参数。当没有剩余的PEL条目时，该命令返回特殊的0-0 ID以表示完成。但是，请注意，您可能希望在扫描完成后继续调用XAUTOCLAIM，并将0-0作为&lt;<code>start</code>&gt; ID，因为已经经过了足够的时间，所以旧的待处理条目现在可能符合索赔条件。</p><p>注意，只有空闲时间大于&lt;<code>min-idle-time</code>&gt;的消息才会被声明，并且声明消息将重置其空闲时间。这确保了只有一个消费者可以在特定时刻成功地声明给定的挂起消息，并大大降低了多次处理相同消息的可能性。</p><p>在迭代PEL时，如果XAUTOCLAIM偶然发现流中不再存在的消息(被XDEL修剪或删除)，它不会声明它，而是从发现它的PEL中删除它。该特性是在Redis 7.0中引入的。这些消息id作为XAUTOCLAIMs应答的一部分返回给调用者。</p><p>最后，使用XAUTOCLAIM声明消息还会增加该消息的尝试传递计数，除非指定了JUSTID选项(仅传递消息ID，而不传递消息本身)。由于某种原因无法处理的消息(例如，由于消费者在处理它们时系统崩溃)将显示可以通过监控检测到的高尝试传递计数。</p><ul><li><p>返回</p><p>数组回复，具体来说:</p><p>数组:有三个元素的数组:</p><ol><li>用于下一次调用XAUTOCLAIM时作为&lt;<code>start</code>&gt;参数的流ID。</li><li>一个数组，包含所有成功认领的消息，格式与XRANGE相同。</li><li>一个数组，其中包含流中不再存在的消息id，并且已从发现它们的PEL中删除。</li></ol></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1676010102849-0&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1676010102849-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XAUTOCLAIM mystream mygroup consumer1 10000 0</span></span>
<span class="line"><span>1) &quot;0-0&quot;</span></span>
<span class="line"><span>2) 1) 1) &quot;1676010102849-0&quot;</span></span>
<span class="line"><span>      2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>         2) &quot;v1&quot;</span></span>
<span class="line"><span>3) (empty array)</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup</span></span>
<span class="line"><span>1) (integer) 1</span></span>
<span class="line"><span>2) &quot;1676010102849-0&quot;</span></span>
<span class="line"><span>3) &quot;1676010102849-0&quot;</span></span>
<span class="line"><span>4) 1) 1) &quot;consumer1&quot;</span></span>
<span class="line"><span>      2) &quot;1&quot;</span></span></code></pre></div><h5 id="xgroup-delconsumer-删除消费者" tabindex="-1">XGROUP DELCONSUMER：删除消费者 <a class="header-anchor" href="#xgroup-delconsumer-删除消费者" aria-label="Permalink to &quot;XGROUP DELCONSUMER：删除消费者&quot;">​</a></h5><ul><li>语法：<code>XGROUP DELCONSUMER key groupname consumername</code></li></ul><p>XGROUP DELCONSUMER命令用来从消费者组中删除一个消费者。</p><p>有时，删除旧的消费者可能是有用的，因为它们不再使用。</p><p>但是请注意，消费者拥有的任何挂起的消息在被删除后都将变得不可声明。因此，强烈建议在从组中删除使用者之前声明或确认任何挂起的消息。</p><ul><li><p>返回</p><p>整数回复:在删除使用者之前的挂起消息的数量</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1676011635947-0&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1676011635947-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XGROUP DELCONSUMER mystream mygroup myconsumer</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup - + 1 myconsumer</span></span>
<span class="line"><span>(empty array)</span></span></code></pre></div><h5 id="xgroup-destroy-删除消费者组" tabindex="-1">XGROUP DESTROY：删除消费者组 <a class="header-anchor" href="#xgroup-destroy-删除消费者组" aria-label="Permalink to &quot;XGROUP DESTROY：删除消费者组&quot;">​</a></h5><ul><li>语法：<code>XGROUP DESTROY key groupname</code></li></ul><p>XGROUP DESTROY命令完全销毁一个消费者组。</p><p>即使存在活动的消费者和挂起的消息，消费者组也将被销毁，因此请确保仅在真正需要时调用此命令。</p><ul><li><p>返回</p><p>整数回复:被销毁的消费组个数(0或1)</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1676012030910-0&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1676012030910-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XGROUP DESTROY mystream mygroup</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; XPENDING mystream mygroup</span></span>
<span class="line"><span>(error) NOGROUP No such key &#39;mystream&#39; or consumer group &#39;mygroup&#39;</span></span></code></pre></div><h4 id="xinfo-stream-查看流信息" tabindex="-1">XINFO STREAM：查看流信息 <a class="header-anchor" href="#xinfo-stream-查看流信息" aria-label="Permalink to &quot;XINFO STREAM：查看流信息&quot;">​</a></h4><ul><li>语法：<code>XINFO STREAM key [FULL [COUNT count]]</code></li></ul><p>该命令返回存储在&lt;<code>key</code>&gt;的流的信息。</p><p>该命令提供的详细信息如下:</p><ul><li><p>length:流中条目的数量(参见XLEN)</p></li><li><p>radix-tree-keys:底层基数据结构中的键数</p></li><li><p>radix-tree-nodes:底层基数据结构中的节点数量</p></li><li><p>groups:为流定义的消费者组的数量</p></li><li><p>last-generated-id:最近添加到流的条目ID</p></li><li><p>max-deleted-entry-id:从流中删除的最大条目ID</p></li><li><p>entries-added:在流的生命周期内添加到流的所有条目的计数</p></li><li><p>first-entry:流中第一个条目的ID和字段值元组</p></li><li><p>last-entry:流中最后一个条目的ID和字段值元组</p></li></ul><p>可选的FULL修饰符提供了更详细的回复。当提供FULL应答时，包含一个条目数组，该数组由流条目(ID和字段值元组)按升序组成。此外，groups也是一个数组，对于每个消费者组，它由XINFO groups和XINFO CONSUMERS报告的信息组成。</p><p>COUNT选项可用于限制返回的流和PEL条目的数量(返回第一个&lt; COUNT &gt;条目)。默认的COUNT是10,COUNT为0意味着将返回所有的条目(如果流有很多条目，执行时间可能会很长)。</p><h5 id="返回值-8" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-8" aria-label="Permalink to &quot;返回值&quot;">​</a></h5><p>数组回复:信息位的列表</p><h5 id="示例-10" tabindex="-1">示例 <a class="header-anchor" href="#示例-10" aria-label="Permalink to &quot;示例&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XINFO STREAM mystream</span></span>
<span class="line"><span> 1) &quot;length&quot;</span></span>
<span class="line"><span> 2) (integer) 0</span></span>
<span class="line"><span> 3) &quot;radix-tree-keys&quot;</span></span>
<span class="line"><span> 4) (integer) 0</span></span>
<span class="line"><span> 5) &quot;radix-tree-nodes&quot;</span></span>
<span class="line"><span> 6) (integer) 1</span></span>
<span class="line"><span> 7) &quot;last-generated-id&quot;</span></span>
<span class="line"><span> 8) &quot;0-0&quot;</span></span>
<span class="line"><span> 9) &quot;max-deleted-entry-id&quot;</span></span>
<span class="line"><span>10) &quot;0-0&quot;</span></span>
<span class="line"><span>11) &quot;entries-added&quot;</span></span>
<span class="line"><span>12) (integer) 0</span></span>
<span class="line"><span>13) &quot;recorded-first-entry-id&quot;</span></span>
<span class="line"><span>14) &quot;0-0&quot;</span></span>
<span class="line"><span>15) &quot;groups&quot;</span></span>
<span class="line"><span>16) (integer) 1</span></span>
<span class="line"><span>17) &quot;first-entry&quot;</span></span>
<span class="line"><span>18) (nil)</span></span>
<span class="line"><span>19) &quot;last-entry&quot;</span></span>
<span class="line"><span>20) (nil)</span></span>
<span class="line"><span>&gt; XINFO STREAM mystream full</span></span>
<span class="line"><span> 1) &quot;length&quot;</span></span>
<span class="line"><span> 2) (integer) 0</span></span>
<span class="line"><span> 3) &quot;radix-tree-keys&quot;</span></span>
<span class="line"><span> 4) (integer) 0</span></span>
<span class="line"><span> 5) &quot;radix-tree-nodes&quot;</span></span>
<span class="line"><span> 6) (integer) 1</span></span>
<span class="line"><span> 7) &quot;last-generated-id&quot;</span></span>
<span class="line"><span> 8) &quot;0-0&quot;</span></span>
<span class="line"><span> 9) &quot;max-deleted-entry-id&quot;</span></span>
<span class="line"><span>10) &quot;0-0&quot;</span></span>
<span class="line"><span>11) &quot;entries-added&quot;</span></span>
<span class="line"><span>12) (integer) 0</span></span>
<span class="line"><span>13) &quot;recorded-first-entry-id&quot;</span></span>
<span class="line"><span>14) &quot;0-0&quot;</span></span>
<span class="line"><span>15) &quot;entries&quot;</span></span>
<span class="line"><span>16) (empty array)</span></span>
<span class="line"><span>17) &quot;groups&quot;</span></span>
<span class="line"><span>18) 1)  1) &quot;name&quot;</span></span>
<span class="line"><span>        2) &quot;mygroup&quot;</span></span>
<span class="line"><span>        3) &quot;last-delivered-id&quot;</span></span>
<span class="line"><span>        4) &quot;0-0&quot;</span></span>
<span class="line"><span>        5) &quot;entries-read&quot;</span></span>
<span class="line"><span>        6) (nil)</span></span>
<span class="line"><span>        7) &quot;lag&quot;</span></span>
<span class="line"><span>        8) (integer) 0</span></span>
<span class="line"><span>        9) &quot;pel-count&quot;</span></span>
<span class="line"><span>       10) (integer) 0</span></span>
<span class="line"><span>       11) &quot;pending&quot;</span></span>
<span class="line"><span>       12) (empty array)</span></span>
<span class="line"><span>       13) &quot;consumers&quot;</span></span>
<span class="line"><span>       14) (empty array)</span></span></code></pre></div><h4 id="xinfo-groups-查看消费者组信息" tabindex="-1">XINFO GROUPS：查看消费者组信息 <a class="header-anchor" href="#xinfo-groups-查看消费者组信息" aria-label="Permalink to &quot;XINFO GROUPS：查看消费者组信息&quot;">​</a></h4><ul><li>语法：<code>XINFO GROUPS key</code></li></ul><p>该命令返回存储在&lt;<code>key</code>&gt;的流的所有消费者组的列表。</p><p>默认情况下，每个组只提供以下信息:</p><ul><li><p>name:消费者组的名称</p></li><li><p>consumers:组中消费者的数量</p></li><li><p>pending:组的pending条目列表(PEL)的长度，它是已交付但尚未被确认的消息</p></li><li><p>last-delivered-id:最后传递该组消费者的条目的ID</p></li><li><p>entries-read:发送给组消费者的最后一个条目的逻辑“读取计数器”</p></li><li><p>lag:流中仍在等待交付给组的消费者的条目的数量，或者当这个数量无法确定时为NULL。</p></li></ul><h5 id="返回值-9" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-9" aria-label="Permalink to &quot;返回值&quot;">​</a></h5><p>数组回复:消费者组列表。</p><h5 id="示例-11" tabindex="-1">示例 <a class="header-anchor" href="#示例-11" aria-label="Permalink to &quot;示例&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XINFO GROUPS mystream</span></span>
<span class="line"><span>1)  1) &quot;name&quot;</span></span>
<span class="line"><span>    2) &quot;mygroup&quot;</span></span>
<span class="line"><span>    3) &quot;consumers&quot;</span></span>
<span class="line"><span>    4) (integer) 0</span></span>
<span class="line"><span>    5) &quot;pending&quot;</span></span>
<span class="line"><span>    6) (integer) 0</span></span>
<span class="line"><span>    7) &quot;last-delivered-id&quot;</span></span>
<span class="line"><span>    8) &quot;0-0&quot;</span></span>
<span class="line"><span>    9) &quot;entries-read&quot;</span></span>
<span class="line"><span>   10) (nil)</span></span>
<span class="line"><span>   11) &quot;lag&quot;</span></span>
<span class="line"><span>   12) (integer) 0</span></span></code></pre></div><h4 id="xinfo-consumers-查看消费者信息" tabindex="-1">XINFO CONSUMERS：查看消费者信息 <a class="header-anchor" href="#xinfo-consumers-查看消费者信息" aria-label="Permalink to &quot;XINFO CONSUMERS：查看消费者信息&quot;">​</a></h4><ul><li>语法：<code>XINFO CONSUMERS key groupname</code></li></ul><p>该命令返回属于存储在&lt;<code>key</code>&gt;的流的&lt;<code>groupname</code>&gt;消费者组的消费者列表。</p><p>为组中的每个消费者提供以下信息:</p><ul><li><p>name:消费者名称</p></li><li><p>pending:客户端挂起的消息数量，这些消息是已交付但尚未被确认的消息</p></li><li><p>idle:自消费者最后一次与服务器交互以来所经过的毫秒数</p></li></ul><h5 id="返回值-10" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-10" aria-label="Permalink to &quot;返回值&quot;">​</a></h5><p>数组回复:消费者列表。</p><h5 id="示例-12" tabindex="-1">示例 <a class="header-anchor" href="#示例-12" aria-label="Permalink to &quot;示例&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; XGROUP CREATE mystream mygroup $ mkstream</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; XINFO CONSUMERS mystream mygroup</span></span>
<span class="line"><span>(empty array)</span></span>
<span class="line"><span>&gt; XADD mystream * k1 v1</span></span>
<span class="line"><span>&quot;1676015264787-0&quot;</span></span>
<span class="line"><span>&gt; XREADGROUP group mygroup myconsumer streams mystream &gt;</span></span>
<span class="line"><span>1) 1) &quot;mystream&quot;</span></span>
<span class="line"><span>   2) 1) 1) &quot;1676015264787-0&quot;</span></span>
<span class="line"><span>         2) 1) &quot;k1&quot;</span></span>
<span class="line"><span>            2) &quot;v1&quot;</span></span>
<span class="line"><span>&gt; XINFO CONSUMERS mystream mygroup</span></span>
<span class="line"><span>1) 1) &quot;name&quot;</span></span>
<span class="line"><span>   2) &quot;myconsumer&quot;</span></span>
<span class="line"><span>   3) &quot;pending&quot;</span></span>
<span class="line"><span>   4) (integer) 1</span></span>
<span class="line"><span>   5) &quot;idle&quot;</span></span>
<span class="line"><span>   6) (integer) 3776</span></span>
<span class="line"><span>&gt; XACK mystream mygroup 1676015264787-0</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; XINFO CONSUMERS mystream mygroup</span></span>
<span class="line"><span>1) 1) &quot;name&quot;</span></span>
<span class="line"><span>   2) &quot;myconsumer&quot;</span></span>
<span class="line"><span>   3) &quot;pending&quot;</span></span>
<span class="line"><span>   4) (integer) 0</span></span>
<span class="line"><span>   5) &quot;idle&quot;</span></span>
<span class="line"><span>   6) (integer) 69518</span></span></code></pre></div><h3 id="geospatial-地理空间" tabindex="-1">Geospatial（地理空间） <a class="header-anchor" href="#geospatial-地理空间" aria-label="Permalink to &quot;Geospatial（地理空间）&quot;">​</a></h3><p>Redis geospatial indexes可以让你存储坐标并搜索它们。此数据结构用于在给定半径或包围框内查找附近点。</p><h4 id="geoadd-存储坐标" tabindex="-1">GEOADD：存储坐标 <a class="header-anchor" href="#geoadd-存储坐标" aria-label="Permalink to &quot;GEOADD：存储坐标&quot;">​</a></h4><ul><li>语法：<code>GEOADD key [NX | XX] [CH] longitude latitude member [longitude latitude member ...]</code></li></ul><p>将指定的地理空间项(经度、纬度、名称)添加到指定的键。数据以排序集的形式存储到键中，这样就可以使用<code>GEOSEARCH</code>命令查询项。</p><p>该命令接受标准格式的参数x,y，因此经度必须在纬度之前指定。可以索引的坐标是有限制的:非常接近极点的区域是不可索引的。</p><p>当用户试图索引指定范围之外的坐标时，该命令将报告一个错误。</p><p>注意:没有<code>GEODEL</code>命令，因为您可以使用<code>ZREM</code>删除元素。Geo索引结构只是一个排序集。</p><ul><li><p><code>GEOADD</code>选项</p><p>XX:只更新已经存在的元素。不要添加元素。 NX:不要更新已经存在的元素。总是添加新元素。 CH:将返回值从添加的新元素数量修改为更改的元素总数(CH是changed的缩写)。已更改的元素是添加的新元素和已存在的元素，这些元素的坐标已更新。因此，在命令行中指定的与过去得分相同的元素不会被计算在内。注意:通常，GEOADD的返回值只计算添加的新元素的数量。</p><p>注意:XX和NX选项互斥。</p></li><li><p>返回</p><p>整数回复，具体为:</p><p>当不带可选参数时，添加到排序集的元素数(不包括分数更新)。</p><p>如果指定了CH选项，则表示更改(添加或更新)的元素数量。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; GEOADD guangdong 113.280637 23.125178 guangzhou</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; GEOADD guangdong 114.085947 22.547 shenzhen 116.708463 23.37102 shantou</span></span>
<span class="line"><span>(integer) 2</span></span></code></pre></div><h4 id="geopos-获取指定位置的坐标" tabindex="-1">GEOPOS：获取指定位置的坐标 <a class="header-anchor" href="#geopos-获取指定位置的坐标" aria-label="Permalink to &quot;GEOPOS：获取指定位置的坐标&quot;">​</a></h4><ul><li>语法：<code>GEOPOS key member [member ...]</code></li></ul><p>返回由设置在键的排序集表示的地理空间索引的所有指定成员的位置(经度、纬度)。</p><p>给定一个表示地理空间索引的排序集(使用<code>GEOADD</code>命令填充)，获取指定成员的坐标通常很有用。当通过<code>GEOADD</code>填充地理空间索引时，坐标被转换为52位geohash，因此返回的坐标可能与添加元素时使用的坐标不完全相同，但可能会引入一些小错误。</p><p>该命令可以接受可变数量的参数，因此即使指定了单个元素，它也总是返回一个位置数组。</p><ul><li><p>返回</p><p>数组回复，具体来说:</p><p>该命令返回一个数组，其中每个元素都是一个包含两个元素的数组，表示作为参数传递给该命令的每个成员名的经度和纬度(x,y)。</p><p>不存在的元素被报告为数组的NULL元素。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; GEOADD guangdong 113.280637 23.125178 guangzhou 114.085947 22.547 shenzhen 116.708463 23.37102 shantou</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; GEOPOS guangdong guangzhou shenzhen zhuhai shantou</span></span>
<span class="line"><span>1) 1) &quot;113.28063815832138062&quot;</span></span>
<span class="line"><span>   2) &quot;23.12517743834835215&quot;</span></span>
<span class="line"><span>2) 1) &quot;114.08594459295272827&quot;</span></span>
<span class="line"><span>   2) &quot;22.54699993773966327&quot;</span></span>
<span class="line"><span>3) (nil)</span></span>
<span class="line"><span>4) 1) &quot;116.70846372842788696&quot;</span></span>
<span class="line"><span>   2) &quot;23.37102004359263674&quot;</span></span></code></pre></div><h4 id="geodist-计算两个位置之间的直线距离" tabindex="-1">GEODIST：计算两个位置之间的直线距离 <a class="header-anchor" href="#geodist-计算两个位置之间的直线距离" aria-label="Permalink to &quot;GEODIST：计算两个位置之间的直线距离&quot;">​</a></h4><ul><li>语法：<code>GEODIST key member1 member2 [M | KM | FT | MI]</code></li></ul><p>返回由已排序集合表示的地理空间索引中两个成员之间的距离。</p><p>给定一个使用<code>GEOADD</code>命令填充表示地理空间索引的排序集，该命令返回指定单元中两个指定成员之间的距离。</p><p>如果缺少一个或两个成员，该命令返回NULL。</p><p>这个距离是在假设地球是一个完美的球体的情况下计算的，所以在边缘情况下误差可能高达0.5%。</p><ul><li><p>选项</p><p>单位必须为以下值之一，默认为米:</p><ul><li>m表示米。</li><li>km表示千米。</li><li>mi表示英里。</li><li>ft表示英尺。</li></ul></li><li><p>返回</p><p>批量字符串回复，具体为:</p><p>该命令以指定单位的双精度值(以字符串形式表示)返回距离，如果缺少一个或两个元素，则返回NULL。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; GEOADD guangdong 113.280637 23.125178 guangzhou 114.085947 22.547 shenzhen 116.708463 23.37102 shantou</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; GEODIST guangdong guangzhou shenzhen</span></span>
<span class="line"><span>&quot;104642.6221&quot;</span></span>
<span class="line"><span>&gt; GEODIST guangdong guangzhou shenzhen km</span></span>
<span class="line"><span>&quot;104.6426&quot;</span></span>
<span class="line"><span>&gt; GEODIST guangdong guangzhou zhuhai</span></span>
<span class="line"><span>(nil)</span></span></code></pre></div><h4 id="geosearch-查找指定坐标给定形状指定的区域内的其他成员" tabindex="-1">GEOSEARCH：查找指定坐标给定形状指定的区域内的其他成员 <a class="header-anchor" href="#geosearch-查找指定坐标给定形状指定的区域内的其他成员" aria-label="Permalink to &quot;GEOSEARCH：查找指定坐标给定形状指定的区域内的其他成员&quot;">​</a></h4><ul><li><p>语法：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GEOSEARCH key &lt;FROMMEMBER member | FROMLONLAT longitude latitude&gt;</span></span>
<span class="line"><span>&lt;BYRADIUS radius &lt;M | KM | FT | MI&gt; | BYBOX width height &lt;M | KM |</span></span>
<span class="line"><span>FT | MI&gt;&gt; [ASC | DESC] [COUNT count [ANY]] [WITHCOORD] [WITHDIST]</span></span>
<span class="line"><span>[WITHHASH]</span></span></code></pre></div></li></ul><p>返回使用<code>GEOADD</code>填充地理空间信息的已排序集合的成员，这些成员位于给定形状指定的区域的边界内。这个命令扩展了<code>GEORADIUS</code>命令，因此除了在圆形区域内搜索外，它还支持在矩形区域内搜索。</p><p>这个命令应该用来代替已弃用的<code>GEORADIUS</code>和<code>GEORADIUSBYMEMBER</code>命令。</p><ul><li><p>查询的中心点由以下强制选项之一提供:</p><ul><li><p>FROMMEMBER:使用给定的&lt;成员&gt;在排序集中的位置。</p></li><li><p>FROMLONLAT:使用给定的&lt;经度&gt;和&lt;纬度&gt;位置。</p></li></ul></li><li><p>查询的形状由以下强制选项之一提供:</p><ul><li><p>BYRADIUS:类似于<code>GEORADIUS</code>，根据给定的&lt;半径&gt;搜索圆形区域内。</p></li><li><p>BYBOX:在轴对齐的矩形内搜索，由&lt;宽度&gt;和&lt;高度&gt;决定。</p></li></ul></li><li><p>该命令使用以下选项可选地返回附加信息:</p><ul><li><p>WITHDIST:还返回返回项到指定中心点的距离。距离以与radius或height和width参数指定的相同单位返回。</p></li><li><p>WITHCOORD:还返回匹配项的经度和纬度。</p></li><li><p>WITHHASH:还返回该项的原始地理哈希编码排序集得分，以52位无符号整数的形式。这只对低级黑客或调试有用，对普通用户没有什么兴趣。</p></li></ul></li><li><p>默认情况下，匹配项未排序返回。要对它们进行排序，请使用以下两个选项之一:</p><ul><li><p>ASC:相对于中心点，从最近到最远对返回项进行排序。</p></li><li><p>DESC:相对于中心点，从最远到最近对返回项进行排序。</p></li></ul></li><li><p>默认情况下返回所有匹配的项。若要将结果限制为前N个匹配项，请使用<code>COUNT &lt;数量&gt;</code>选项。当使用ANY选项时，只要找到足够的匹配项，该命令就返回。这意味着返回的结果可能不是最接近指定点的结果，但是服务器为生成这些结果所投入的精力会大大减少。当没有提供ANY时，该命令将执行与匹配指定区域的项目数量成比例的工作并对它们进行排序，因此使用非常小的COUNT选项查询非常大的区域可能会很慢，即使只返回一些结果。</p></li><li><p>返回</p><p>数组回复，具体来说:</p><p>如果没有指定WITH选项，该命令只返回一个线性数组，如[&quot;New York&quot;，&quot;Milan&quot;，&quot;Paris&quot;]。</p><p>如果指定了WITHCOORD、WITHDIST或WITHHASH选项，该命令将返回一个数组的数组，其中每个子数组代表一个项。</p><p>当附加信息作为每个项的数组数组返回时，子数组中的第一项始终是返回项的名称。其他信息将按照以下顺序作为子数组的连续元素返回。</p><ol><li>到中心的距离，以浮点数表示，与形状中指定的单位相同。</li><li>geohash整数。</li><li>将坐标作为两项x、y数组(经度、纬度)。</li></ol></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; GEOADD guangdong 113.280637 23.125178 guangzhou 114.085947 22.547 shenzhen 116.708463 23.37102 shantou</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; GEOSEARCH guangdong frommember shantou byradius 300 km asc</span></span>
<span class="line"><span>1) &quot;shantou&quot;</span></span>
<span class="line"><span>2) &quot;shenzhen&quot;</span></span>
<span class="line"><span>&gt; GEOSEARCH guangdong fromlonlat 116.71 23.38 bybox 1000 800 km desc count 2 withdist withcoord</span></span>
<span class="line"><span>1) 1) &quot;guangzhou&quot;</span></span>
<span class="line"><span>   2) &quot;351.5882&quot;</span></span>
<span class="line"><span>   3) 1) &quot;113.28063815832138062&quot;</span></span>
<span class="line"><span>      2) &quot;23.12517743834835215&quot;</span></span>
<span class="line"><span>2) 1) &quot;shenzhen&quot;</span></span>
<span class="line"><span>   2) &quot;284.2513&quot;</span></span>
<span class="line"><span>   3) 1) &quot;114.08594459295272827&quot;</span></span>
<span class="line"><span>      2) &quot;22.54699993773966327&quot;</span></span></code></pre></div><h4 id="geosearchstore-查找指定坐标给定形状指定的区域内的其他成员并将结果保存到目标键" tabindex="-1">GEOSEARCHSTORE：查找指定坐标给定形状指定的区域内的其他成员并将结果保存到目标键 <a class="header-anchor" href="#geosearchstore-查找指定坐标给定形状指定的区域内的其他成员并将结果保存到目标键" aria-label="Permalink to &quot;GEOSEARCHSTORE：查找指定坐标给定形状指定的区域内的其他成员并将结果保存到目标键&quot;">​</a></h4><ul><li><p>语法：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>GEOSEARCHSTORE destination source &lt;FROMMEMBER member |</span></span>
<span class="line"><span>FROMLONLAT longitude latitude&gt; &lt;BYRADIUS radius &lt;M | KM | FT | MI&gt;</span></span>
<span class="line"><span>| BYBOX width height &lt;M | KM | FT | MI&gt;&gt; [ASC | DESC] [COUNT count</span></span>
<span class="line"><span>[ANY]] [STOREDIST]</span></span></code></pre></div></li></ul><p>此命令类似于<a href="#geosearch查找指定坐标给定形状指定的区域内的其他成员">GEOSEARCH</a>，但将结果存储在目标键中。</p><p>该命令替换现在已弃用的<code>GEORADIUS</code>和<code>GEORADIUSBYMEMBER</code>。</p><p>默认情况下，它将结果存储在目的地排序集合中，其中包含地理空间信息。</p><p>当使用STOREDIST选项时，该命令将项目存储在一个已排序的集中，其中填充了它们到圆圈或框的中心的距离，作为浮点数，存储在为该形状指定的同一单位中。</p><ul><li><p>返回</p><p>整数回复:结果集中的元素数量。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; GEOADD guangdong 113.280637 23.125178 guangzhou 114.085947 22.547 shenzhen 116.708463 23.37102 shantou</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; GEOSEARCHSTORE key1 guangdong frommember shantou byradius 300 km asc</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; GEOSEARCH key1 fromlonlat 116.71 23.38 bybox 600 800 km desc count 2 withdist withcoord</span></span>
<span class="line"><span>1) 1) &quot;shenzhen&quot;</span></span>
<span class="line"><span>   2) &quot;284.2513&quot;</span></span>
<span class="line"><span>   3) 1) &quot;114.08594459295272827&quot;</span></span>
<span class="line"><span>      2) &quot;22.54699993773966327&quot;</span></span>
<span class="line"><span>2) 1) &quot;shantou&quot;</span></span>
<span class="line"><span>   2) &quot;1.0110&quot;</span></span>
<span class="line"><span>   3) 1) &quot;116.70846372842788696&quot;</span></span>
<span class="line"><span>      2) &quot;23.37102004359263674&quot;</span></span>
<span class="line"><span>&gt; GEOSEARCHSTORE key2 guangdong frommember shantou byradius 300 km asc storedist</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; ZRANGE key2 0 -1 withscores</span></span>
<span class="line"><span>1) &quot;shantou&quot;</span></span>
<span class="line"><span>2) &quot;0&quot;</span></span>
<span class="line"><span>3) &quot;shenzhen&quot;</span></span>
<span class="line"><span>4) &quot;283.78695287202783&quot;</span></span></code></pre></div><h3 id="bitmaps-位图" tabindex="-1">Bitmaps（位图） <a class="header-anchor" href="#bitmaps-位图" aria-label="Permalink to &quot;Bitmaps（位图）&quot;">​</a></h3><p>Redis bitmaps是字符串数据类型的扩展，它可以让您像对待位向量一样对待字符串。还可以对一个或多个字符串执行按位操作。</p><h4 id="setbit-设置二进制位的值" tabindex="-1">SETBIT：设置二进制位的值 <a class="header-anchor" href="#setbit-设置二进制位的值" aria-label="Permalink to &quot;SETBIT：设置二进制位的值&quot;">​</a></h4><ul><li>语法：<code>SETBIT key offset value</code></li></ul><p>设置或清除存储在key上的字符串值中的偏移位。</p><p>根据值设置或清除位，该值可以是0或1。</p><p>当key不存在时，将创建一个新的字符串值。字符串的生长是为了确保它能在偏移处容纳一点。offset参数必须大于等于0，小于2^32(这将位图限制为512MB)。当key的字符串增长时，添加的位被设置为0。</p><ul><li><p>返回</p><p>整型回复:存储在offset位置的原始位值。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SETBIT mybitmap 0 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 0 0</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 5 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 2 1</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="getbit-获取二进制位的值" tabindex="-1">GETBIT：获取二进制位的值 <a class="header-anchor" href="#getbit-获取二进制位的值" aria-label="Permalink to &quot;GETBIT：获取二进制位的值&quot;">​</a></h4><ul><li>语法：<code>GETBIT key offset</code></li></ul><p>返回存储在key的字符串值中偏移处的位值。</p><p>当偏移量超过字符串长度时，假定字符串是一个0位的连续空格。当key不存在时，它被假定为空字符串，因此offset总是超出范围，值也被假定为一个0位的连续空格。</p><ul><li><p>返回</p><p>整型回复:存储在offset位置的位值。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SETBIT mybitmap 5 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 2 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; GETBIT mybitmap 2</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; GETBIT mybitmap 5</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; GETBIT mybitmap 0</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="bitcount-统计被设置的二进制位数量" tabindex="-1">BITCOUNT：统计被设置的二进制位数量 <a class="header-anchor" href="#bitcount-统计被设置的二进制位数量" aria-label="Permalink to &quot;BITCOUNT：统计被设置的二进制位数量&quot;">​</a></h4><ul><li>语法：<code>BITCOUNT key [start end [BYTE | BIT]]</code></li></ul><p>计算字符串中设置位的数量(总计数)。</p><p>默认情况下，检查字符串中包含的所有字节。可以只在传递附加参数start和end的间隔内指定计数操作。</p><p>与<code>GETRANGE</code>命令类似，start和end可以包含负值，以便索引从字符串末尾开始的字节，其中-1是最后一个字节，-2是倒数第二个字节，依此类推。</p><p>不存在的键被视为空字符串，因此该命令将返回零。</p><p>默认情况下，附加参数start和end指定字节索引。我们可以使用额外的参数BIT来指定位索引。0是第1位，1是第2位，以此类推。对于负值，-1是最后一位，-2是倒数第二位，依此类推。</p><ul><li><p>返回</p><p>整型回复:设置为1的比特数量。</p></li><li><p>历史</p><p>从Redis 7.0.0版本开始:添加了BYTE|BIT选项。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SETBIT mybitmap 0 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 5 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 10 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 12 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 13 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; BITCOUNT mybitmap 0 -1</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; BITCOUNT mybitmap 0 0</span></span>
<span class="line"><span>(integer) 2</span></span>
<span class="line"><span>&gt; BITCOUNT mybitmap 0 0 bit</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; BITCOUNT mybitmap -1 -1</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; BITCOUNT mybitmap -3 -1 bit</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre></div><h4 id="bitpos-查找第一个指定的二进制位值" tabindex="-1">BITPOS：查找第一个指定的二进制位值 <a class="header-anchor" href="#bitpos-查找第一个指定的二进制位值" aria-label="Permalink to &quot;BITPOS：查找第一个指定的二进制位值&quot;">​</a></h4><ul><li>语法：<code>BITPOS key bit [start [end [BYTE | BIT]]]</code></li></ul><p>返回字符串中第一个位设置为1或0的位置。</p><p>返回位置，将字符串视为一个从左到右的位数组，其中第一个字节的最高位在位置0，第二个字节的最高位在位置8，依此类推。</p><p><code>GETBIT</code>和<code>SETBIT</code>遵循相同的位位置约定。</p><p>默认情况下，检查字符串中包含的所有字节。它可以只在指定的间隔内寻找位，传递额外的参数start和end(也可以只传递start，该操作将假设end是字符串的最后一个字节)。但是语义上有差异，后面会解释)。默认情况下，该范围被解释为一个字节范围，而不是一个比特范围，因此start=0和end=2意味着查看前三个字节。</p><p>请注意，即使使用start和end指定一个范围，位位置也总是作为从位0开始的绝对值返回。</p><p>与<code>GETRANGE</code>命令类似，start和end可以包含负值，以便索引从字符串末尾开始的字节，其中-1是最后一个字节，-2是倒数第二个字节，依此类推。当指定BIT时，-1是最后一位，-2是倒数第二位，依此类推。</p><p>不存在的键被视为空字符串。</p><ul><li><p>返回</p><p>整型回复:</p><p>该命令根据请求返回第一个位设置为1或0的位置。</p><p>如果我们查找set bits (bit参数为1)，而字符串为空或仅由零字节组成，则返回-1。</p><p>如果我们寻找明确的位(bit参数为0)，而字符串只包含设置为1的位，函数将返回第一个不属于右侧字符串的位。因此，如果字符串是3个字节，设置为值0xff，命令BITPOS密钥0将返回24，因为直到第23位所有的位都是1。</p><p>基本上，如果您寻找明确的位，并且没有指定范围或只指定start参数，则该函数将字符串的右侧视为用零填充。</p><p>但是，如果您正在寻找清晰的位，并同时指定起始和结束范围，则此行为将发生变化。如果在指定的范围内没有找到明确的位，该函数将返回-1，因为用户指定了一个明确的范围，并且在该范围内没有0位。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SETBIT mybitmap 5 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 10 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 12 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT mybitmap 13 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; BITPOS mybitmap 0</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; BITPOS mybitmap 1</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; BITPOS mybitmap 1 0 0</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; BITPOS mybitmap 1 1 1</span></span>
<span class="line"><span>(integer) 10</span></span>
<span class="line"><span>&gt; BITPOS mybitmap 1 1 1 bit</span></span>
<span class="line"><span>(integer) -1</span></span>
<span class="line"><span>&gt; BITPOS mybitmap 1 1 -1 bit</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; BITPOS mybitmap 0 13 -1 bit</span></span>
<span class="line"><span>(integer) 14</span></span>
<span class="line"><span>&gt; BITPOS mybitmap 0 14 -1 bit</span></span>
<span class="line"><span>(integer) 14</span></span></code></pre></div><h4 id="bitop-执行二进制位运算" tabindex="-1">BITOP：执行二进制位运算 <a class="header-anchor" href="#bitop-执行二进制位运算" aria-label="Permalink to &quot;BITOP：执行二进制位运算&quot;">​</a></h4><ul><li>语法：<code>BITOP operation destkey key [key ...]</code></li></ul><p>在多个键(包含字符串值)之间执行位操作，并将结果存储在目标键中。</p><p>BITOP命令支持四种位操作:AND, OR, XOR和NOT，因此调用该命令的有效形式是:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BITOP AND destkey srckey1 srckey2 srckey3 ... srckeyN</span></span>
<span class="line"><span>BITOP OR destkey srckey1 srckey2 srckey3 ... srckeyN</span></span>
<span class="line"><span>BITOP XOR destkey srckey1 srckey2 srckey3 ... srckeyN</span></span>
<span class="line"><span>BITOP NOT destkey srckey</span></span></code></pre></div><p>正如你所看到的，NOT是特殊的，因为它只接受一个输入键，因为它执行位的反转，所以它只作为一个一元运算符有意义。</p><p>操作的结果总是存储在destkey。</p><p>当在具有不同长度的字符串之间执行操作时，集合中所有比最长字符串短的字符串都将被视为从零填充到最长字符串的长度。</p><p>这同样适用于不存在的键，它们被视为长度不超过最长字符串的零字节流。</p><ul><li><p>返回</p><p>整型回复:</p><p>存储在目标键中的字符串的大小，等于最长的输入字符串的大小。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SETBIT bitmap1 1 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT bitmap1 3 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT bitmap2 0 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT bitmap2 2 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; SETBIT bitmap2 4 1</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; BITOP and and-bitmap bitmap1 bitmap2</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; BITCOUNT and-bitmap</span></span>
<span class="line"><span>(integer) 0</span></span>
<span class="line"><span>&gt; BITOP or or-bitmap bitmap1 bitmap2</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; BITCOUNT or-bitmap</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; BITOP xor xor-bitmap bitmap1 bitmap2</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; BITCOUNT xor-bitmap</span></span>
<span class="line"><span>(integer) 5</span></span>
<span class="line"><span>&gt; BITOP not not-bitmap bitmap1</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; BITCOUNT not-bitmap</span></span>
<span class="line"><span>(integer) 6</span></span></code></pre></div><h3 id="bitfields-位域" tabindex="-1">Bitfields（位域） <a class="header-anchor" href="#bitfields-位域" aria-label="Permalink to &quot;Bitfields（位域）&quot;">​</a></h3><p>Redis bitfields允许您设置、递增和获取任意位长度的整数值。例如，您可以对从无符号1位整数到有符号63位整数的任何数字进行操作。</p><p>这些值使用二进制编码的Redis字符串存储。位字段支持原子读、写和递增操作，这使它们成为管理计数器和类似数值的好选择。</p><h4 id="bitfield-在位图中存储整数值" tabindex="-1">BITFIELD：在位图中存储整数值 <a class="header-anchor" href="#bitfield-在位图中存储整数值" aria-label="Permalink to &quot;BITFIELD：在位图中存储整数值&quot;">​</a></h4><ul><li><p>语法：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>BITFIELD key &lt;GET encoding offset | [OVERFLOW &lt;WRAP | SAT | FAIL&gt;]</span></span>
<span class="line"><span>&lt;SET encoding offset value | INCRBY encoding offset increment&gt;</span></span>
<span class="line"><span>[GET encoding offset | [OVERFLOW &lt;WRAP | SAT | FAIL&gt;]</span></span>
<span class="line"><span>&lt;SET encoding offset value | INCRBY encoding offset increment&gt;</span></span>
<span class="line"><span>...]&gt;</span></span></code></pre></div></li></ul><p>该命令将Redis字符串视为一个比特数组，并能够处理特定的整数字段的变化位宽和任意非(必要的)对齐偏移。在实际应用中，您可以使用此命令将一个带符号的5位整数(位偏移1234)设置为特定值，从偏移4567检索一个31位无符号整数。类似地，该命令处理指定整数的递增和递减，提供用户可以配置的有保证且指定良好的溢出和下溢行为。</p><p>BITFIELD能够在同一个命令调用中操作多个位字段。它接受一个要执行的操作列表，并返回一个答复数组，其中每个数组都与参数列表中的相应操作相匹配。</p><p>例如，下面的命令将一个5位无符号整数的位偏移量为100的值加1，并得到一个4位无符号整数的位偏移量为0的值:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BITFIELD mykey INCRBY i5 100 1 GET u4 0</span></span>
<span class="line"><span>1) (integer) 1</span></span>
<span class="line"><span>2) (integer) 0</span></span></code></pre></div><p>注意:</p><ol><li><p>使用当前字符串长度之外的GET位寻址(包括键根本不存在的情况)，结果执行的操作就像缺失的部分全部由设置为0的位组成。</p></li><li><p>在当前字符串长度之外使用SET或INCRBY位寻址将扩大字符串，根据需要，根据触及的最远位，对其进行零填充以达到所需的最小长度。</p></li></ol><h5 id="支持子命令和整数编码" tabindex="-1">支持子命令和整数编码 <a class="header-anchor" href="#支持子命令和整数编码" aria-label="Permalink to &quot;支持子命令和整数编码&quot;">​</a></h5><p>下面是支持的命令列表。</p><ul><li><p><code>GET &lt;encoding&gt; &lt;offset&gt;</code> —— 返回指定的位字段。</p></li><li><p><code>SET &lt;encoding&gt; &lt;offset&gt; &lt;value&gt;</code> —— 设置指定的位字段并返回其旧值。</p></li><li><p><code>INCRBY &lt;encoding&gt; &lt;offset&gt; &lt;increment&gt;</code> —— 递增或递减指定的位字段(如果给出负的增量)并返回新值。</p></li></ul><p>还有一个子命令只通过设置溢出行为来改变连续INCRBY和SET子命令调用的行为:</p><ul><li><code>OVERFLOW [WRAP|SAT|FAIL]</code></li></ul><p>在期望使用整数编码的情况下，可以通过在整数编码的位数前加上i和u来组成整数编码。例如u8是一个8位的无符号整数，i16是一个16位的有符号整数。</p><p>对于有符号整数，支持的编码最高为64位，对于无符号整数，支持的编码最高为63位。无符号整数的这种限制是由于目前Redis协议无法返回64位无符号整数作为应答。</p><h5 id="位和位置偏移量" tabindex="-1">位和位置偏移量 <a class="header-anchor" href="#位和位置偏移量" aria-label="Permalink to &quot;位和位置偏移量&quot;">​</a></h5><p>有两种方法可以在位字段命令中指定偏移量。</p><p>如果指定了一个没有任何前缀的数字，则它仅用作字符串中以零为基础的位偏移量。</p><p>然而，如果偏移量以#字符作为前缀，则指定的偏移量将乘以整数编码的宽度。例如:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BITFIELD mystring SET i8 #0 100 SET i8 #1 200</span></span>
<span class="line"><span>1) (integer) 0</span></span>
<span class="line"><span>2) (integer) 0</span></span></code></pre></div><p>将第一个i8整数设置为偏移量0，第二个i8整数设置为偏移量8。这样，如果您想要的是给定大小的普通整数数组，您就不必在客户端内部亲自进行计算。</p><h5 id="溢出控制" tabindex="-1">溢出控制 <a class="header-anchor" href="#溢出控制" aria-label="Permalink to &quot;溢出控制&quot;">​</a></h5><p>使用OVERFLOW命令，用户可以通过指定以下行为之一来微调增量或递减溢出(或下溢)的行为:</p><ul><li><p>WRAP:对有符号整数和无符号整数进行环绕。在无符号整数的情况下，包装就像对整数可以包含的最大值进行模运算(C标准行为)。而对于有符号整数，自动换行意味着溢出会朝着最负的值重新开始，而下溢出则朝着最正的值重新开始，例如，如果将一个i8整数设置为127，则将其加1将得到-128。</p></li><li><p>SAT:采用饱和算法，即流量不足时取最小整数值，溢出时取最大整数值。例如，一个i8整数从值120开始加10，将得到值127，再加10将始终保持值127。同样的情况也发生在下流量上，但在最负的值处被阻塞。</p></li><li><p>FAIL:对检测到的溢出或下溢不做任何操作。相应的返回值被设置为NULL以向调用者发出条件信号。</p></li></ul><p>注意，每个OVERFLOW语句只影响子命令列表中紧随其后的INCRBY和SET命令，直到下一个OVERFLOW语句。</p><p>缺省情况下，如果没有指定，则使用WRAP。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BITFIELD mykey incrby u2 100 1 OVERFLOW SAT incrby u2 102 1</span></span>
<span class="line"><span>1) (integer) 1</span></span>
<span class="line"><span>2) (integer) 1</span></span>
<span class="line"><span>&gt; BITFIELD mykey incrby u2 100 1 OVERFLOW SAT incrby u2 102 1</span></span>
<span class="line"><span>1) (integer) 2</span></span>
<span class="line"><span>2) (integer) 2</span></span>
<span class="line"><span>&gt; BITFIELD mykey incrby u2 100 1 OVERFLOW SAT incrby u2 102 1</span></span>
<span class="line"><span>1) (integer) 3</span></span>
<span class="line"><span>2) (integer) 3</span></span>
<span class="line"><span>&gt; BITFIELD mykey incrby u2 100 1 OVERFLOW SAT incrby u2 102 1</span></span>
<span class="line"><span>1) (integer) 0</span></span>
<span class="line"><span>2) (integer) 3</span></span></code></pre></div><h5 id="返回值-11" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-11" aria-label="Permalink to &quot;返回值&quot;">​</a></h5><p>该命令返回一个数组，其中每个条目都是在相同位置给定的子命令的相应结果。OVERFLOW子命令不算作生成应答。</p><p>下面是OVERFLOW FAIL返回NULL的示例。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BITFIELD mykey OVERFLOW FAIL incrby u2 102 1</span></span>
<span class="line"><span>1) (nil)</span></span></code></pre></div><h5 id="示例-13" tabindex="-1">示例 <a class="header-anchor" href="#示例-13" aria-label="Permalink to &quot;示例&quot;">​</a></h5><ul><li><p>BITFIELD SET和GET</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BITFIELD mybitmap set u8 0 123 set u16 8 456</span></span>
<span class="line"><span>1) (integer) 0</span></span>
<span class="line"><span>2) (integer) 0</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap get u8 0 get u16 8</span></span>
<span class="line"><span>1) (integer) 123</span></span>
<span class="line"><span>2) (integer) 456</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap set u8 #3 100 set u8 #4 50</span></span>
<span class="line"><span>1) (integer) 0</span></span>
<span class="line"><span>2) (integer) 0</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap get u8 0 get u16 8 get u8 16 get u8 24</span></span>
<span class="line"><span>1) (integer) 123</span></span>
<span class="line"><span>2) (integer) 456</span></span>
<span class="line"><span>3) (integer) 200</span></span>
<span class="line"><span>4) (integer) 100</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap get u8 0 get u16 8 get u8 24 get u8 32</span></span>
<span class="line"><span>1) (integer) 123</span></span>
<span class="line"><span>2) (integer) 456</span></span>
<span class="line"><span>3) (integer) 100</span></span>
<span class="line"><span>4) (integer) 50</span></span></code></pre></div></li><li><p>BITFIELD INCRBY</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BITFIELD mybitmap incrby u8 0 128</span></span>
<span class="line"><span>1) (integer) 128</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap incrby u8 0 100</span></span>
<span class="line"><span>1) (integer) 228</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap incrby u8 0 27</span></span>
<span class="line"><span>1) (integer) 255</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap incrby u8 0 1</span></span>
<span class="line"><span>1) (integer) 0</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap get u8 0</span></span>
<span class="line"><span>1) (integer) 0</span></span></code></pre></div></li><li><p>BITFIELD OVERFLOW</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BITFIELD mybitmap incrby u8 0 255</span></span>
<span class="line"><span>1) (integer) 255</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap incrby u8 0 2</span></span>
<span class="line"><span>1) (integer) 1</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap get u8 0</span></span>
<span class="line"><span>1) (integer) 1</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap overflow wrap incrby u8 0 256</span></span>
<span class="line"><span>1) (integer) 1</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap overflow sat incrby u8 0 256</span></span>
<span class="line"><span>1) (integer) 255</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap overflow fail incrby u8 0 2</span></span>
<span class="line"><span>1) (nil)</span></span>
<span class="line"><span>&gt; BITFIELD mybitmap get u8 0</span></span>
<span class="line"><span>1) (integer) 255</span></span></code></pre></div></li></ul><h3 id="hyperloglog-基数统计" tabindex="-1">HyperLogLog（基数统计） <a class="header-anchor" href="#hyperloglog-基数统计" aria-label="Permalink to &quot;HyperLogLog（基数统计）&quot;">​</a></h3><p>HyperLogLog是一种估计集合基数的数据结构。作为一种概率数据结构，HyperLogLog以完美的准确性换取了高效的空间利用。</p><p>Redis HyperLogLog实现最多使用12 KB，提供0.81%的标准误差。</p><h4 id="pfadd-对集合元素进行计数" tabindex="-1">PFADD：对集合元素进行计数 <a class="header-anchor" href="#pfadd-对集合元素进行计数" aria-label="Permalink to &quot;PFADD：对集合元素进行计数&quot;">​</a></h4><ul><li>语法：<code>PFADD key [element [element ...]]</code></li></ul><p>将所有元素参数添加到存储在作为第一个参数指定的变量名处的HyperLogLog数据结构中。</p><p>这个命令的一个副作用是，HyperLogLog内部可能会被更新，以反映到目前为止添加的唯一项数量的不同估计(集合的基数)。</p><p>如果执行命令后HyperLogLog估计的近似基数发生变化，PFADD返回1，否则返回0。如果指定的键不存在，该命令会自动创建一个空的HyperLogLog结构(即具有指定长度和给定编码的Redis String)。</p><p>如果不使用元素而只使用变量名来调用命令，如果变量已经存在，则不执行任何操作;如果键不存在，则只创建数据结构(在后一种情况下返回1)。</p><ul><li><p>返回</p><p>如果至少有一个HyperLogLog内部寄存器被更改，则为1。否则为0。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; PFADD myhll a b c</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; PFADD myhll c d e</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; PFADD myhll a</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h4 id="pfcount-返回集合的近似基数" tabindex="-1">PFCOUNT：返回集合的近似基数 <a class="header-anchor" href="#pfcount-返回集合的近似基数" aria-label="Permalink to &quot;PFCOUNT：返回集合的近似基数&quot;">​</a></h4><ul><li>语法：<code>PFCOUNT key [key ...]</code></li></ul><p>当使用单个键调用时，返回由存储在指定变量中的HyperLogLog数据结构计算的近似基数，如果变量不存在，则该基数为0。</p><p>当使用多个键调用时，通过在内部将存储在提供的键中的HyperLogLog合并为临时HyperLogLog，返回传递的HyperLogLog联合的近似基数。</p><p>HyperLogLog数据结构可以用来计算一个集合中的唯一元素，只需要少量的固定内存，特别是每个HyperLogLog使用12k字节(加上密钥本身的几个字节)。</p><p>观测集的返回基数并不精确，但近似于0.81%的标准误差。</p><p>例如，为了计算一天中执行的所有惟一搜索查询的计数，程序需要在每次处理查询时调用PFADD。可以在任何时候用PFCOUNT检索惟一查询的估计数量。</p><p>注意:作为调用此函数的一个副作用，HyperLogLog可能会被修改，因为最后8个字节编码了用于缓存的最新计算基数。PFCOUNT在技术上是一个写命令。</p><ul><li><p>返回</p><p>通过PFADD观察到的唯一元素的近似数量。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; PFADD hll1 a b c</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; PFCOUNT hll1</span></span>
<span class="line"><span>(integer) 3</span></span>
<span class="line"><span>&gt; PFADD hll1 c d</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; PFCOUNT hll1</span></span>
<span class="line"><span>(integer) 4</span></span>
<span class="line"><span>&gt; PFADD hll2 1 2 3</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; PFCOUNT hll1 hll2</span></span>
<span class="line"><span>(integer) 7</span></span></code></pre></div><h4 id="pfmerge-计算多个hyperloglog的并集" tabindex="-1">PFMERGE：计算多个HyperLogLog的并集 <a class="header-anchor" href="#pfmerge-计算多个hyperloglog的并集" aria-label="Permalink to &quot;PFMERGE：计算多个HyperLogLog的并集&quot;">​</a></h4><ul><li>语法：<code>PFMERGE destkey sourcekey [sourcekey ...]</code></li></ul><p>将多个HyperLogLog值合并为一个唯一值，该值将近似于源HyperLogLog结构的观测集的联合的基数。</p><p>计算合并的HyperLogLog设置为目标变量，如果不存在则创建目标变量(默认为空HyperLogLog)。</p><p>如果目标变量存在，则将其视为源集之一，其基数将包含在计算的HyperLogLog基数中。</p><ul><li><p>返回</p><p>命令只返回OK。</p></li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; PFADD hll1 a b c</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; PFADD hll2 1 2 3</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; PFMERGE hll3 hll1 hll2</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; PFCOUNT hll3</span></span>
<span class="line"><span>(integer) 6</span></span>
<span class="line"><span>&gt; PFADD hll3 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; PFMERGE hll3 hll1 hll2</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; PFCOUNT hll3</span></span>
<span class="line"><span>(integer) 7</span></span></code></pre></div><h2 id="事务" tabindex="-1">事务 <a class="header-anchor" href="#事务" aria-label="Permalink to &quot;事务&quot;">​</a></h2><p>Redis事务允许在一个步骤中执行一组命令，它们以命令MULTI, EXEC, DISCARD和WATCH为中心。Redis Transactions做了两个重要的保证:</p><ul><li><p>事务中的所有命令都被序列化并按顺序执行。另一个客户端发送的请求永远不会在执行Redis事务的过程中被服务。这保证了命令作为单个隔离操作执行。</p></li><li><p>EXEC命令触发事务中所有命令的执行，因此，如果客户端在调用EXEC命令之前失去了与事务上下文中服务器的连接，则不会执行任何操作，相反，如果调用EXEC命令，则执行所有操作。当使用append only文件时，Redis确保使用一个write(2)系统调用将事务写入磁盘。但是，如果Redis服务器崩溃或被系统管理员以某种困难的方式杀死，则可能只注册了部分操作。Redis会在重启时检测到这种情况，并退出并报错。使用redis-check-aof工具可以修复append only文件，删除部分事务，以便服务器可以重新启动。</p></li></ul><p>从2.2版本开始，Redis以乐观锁定的形式，以一种非常类似于CAS (check and set)操作的方式，为上述两个提供了额外的保证。这将在本页后面进行说明。</p><h3 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-label="Permalink to &quot;使用&quot;">​</a></h3><p>使用MULTI命令输入Redis事务。该命令总是返回OK。</p><p>此时，用户可以发出多个命令。Redis不会执行这些命令，而是将它们排队。</p><p>一旦调用EXEC，就会执行所有命令。</p><p>而调用DISCARD将刷新事务队列并退出事务。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; MULTI</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>(TX)&gt; SET key1 value1</span></span>
<span class="line"><span>QUEUED</span></span>
<span class="line"><span>(TX)&gt; SET key2 value2</span></span>
<span class="line"><span>QUEUED</span></span>
<span class="line"><span>(TX)&gt; MGET key1 key2</span></span>
<span class="line"><span>QUEUED</span></span>
<span class="line"><span>(TX)&gt; EXEC</span></span>
<span class="line"><span>1) OK</span></span>
<span class="line"><span>2) OK</span></span>
<span class="line"><span>3) 1) &quot;value1&quot;</span></span>
<span class="line"><span>   2) &quot;value2&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; MULTI</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>(TX)&gt; SET key1 hello</span></span>
<span class="line"><span>QUEUED</span></span>
<span class="line"><span>(TX)&gt; SET key2 world</span></span>
<span class="line"><span>QUEUED</span></span>
<span class="line"><span>(TX)&gt; DISCARD</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; MGET key1 key2</span></span>
<span class="line"><span>1) &quot;value1&quot;</span></span>
<span class="line"><span>2) &quot;value2&quot;</span></span></code></pre></div><p>从上面的会话中可以清楚地看到，EXEC返回一个应答数组，其中每个元素都是事务中单个命令的应答，顺序与发出命令的顺序相同。</p><p>当一个Redis连接处于MULTI请求的上下文中时，所有的命令都会用字符串QUEUED(从Redis协议的角度来看，作为状态回复发送)来回复。排队命令只是在调用EXEC时安排执行。</p><h3 id="使用check-and-set的乐观锁-watch" tabindex="-1">使用check-and-set的乐观锁（WATCH） <a class="header-anchor" href="#使用check-and-set的乐观锁-watch" aria-label="Permalink to &quot;使用check-and-set的乐观锁（WATCH）&quot;">​</a></h3><p>WATCH用于为Redis事务提供检查和设置(CAS)行为。</p><p>监视键是为了检测针对它们的更改。如果在执行EXEC命令之前至少修改了一个被监视的键，那么整个事务将终止，EXEC将返回一个Null应答来通知事务失败。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey 0</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; WATCH mykey</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCR mykey</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; MULTI</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>(TX)&gt; INCR mykey</span></span>
<span class="line"><span>QUEUED</span></span>
<span class="line"><span>(TX)&gt; EXEC</span></span>
<span class="line"><span>(nil)</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;1&quot;</span></span></code></pre></div><p>那么WATCH到底是关于什么的呢?这是一个使EXEC有条件的命令:我们要求Redis只在没有被修改的情况下执行事务。这包括客户端所做的修改，比如写命令，以及Redis本身所做的修改，比如过期或驱逐。如果在监视键和接收EXEC之间修改了键，则整个事务将被中止。</p><p>当调用EXEC时，无论事务是否被终止，所有键都是UNWATCH的。此外，当客户端连接关闭时，所有内容也都是UNWATCH的。</p><p>也可以使用UNWATCH命令(不带参数)来刷新所有被监视的键。有时，当我们乐观地锁定几个键时，这是有用的，因为我们可能需要执行一个事务来更改这些键，但在读取了键的当前内容后，我们不想继续。当这种情况发生时，我们只需调用UNWATCH，这样连接就可以自由地用于新的事务。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SET mykey 0</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; WATCH mykey</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; INCR mykey</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>&gt; UNWATCH</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>&gt; MULTI</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>(TX)&gt; INCR mykey</span></span>
<span class="line"><span>QUEUED</span></span>
<span class="line"><span>(TX)&gt; EXEC</span></span>
<span class="line"><span>1) (integer) 2</span></span>
<span class="line"><span>&gt; GET mykey</span></span>
<span class="line"><span>&quot;2&quot;</span></span></code></pre></div><h2 id="发布与订阅" tabindex="-1">发布与订阅 <a class="header-anchor" href="#发布与订阅" aria-label="Permalink to &quot;发布与订阅&quot;">​</a></h2><p>SUBSCRIBE, UNSUBSCRIBE和PUBLISH实现了PUBLISH / SUBSCRIBE消息传递范例，其中(引用Wikipedia)发送者(发布者)没有被编程为将其消息发送给特定的接收者(订阅者)。相反，发布的消息被特征化到通道中，而不知道可能有哪些订阅者(如果有的话)。订阅者表示对一个或多个通道感兴趣，并且只接收感兴趣的消息，而不知道有什么发布者(如果有的话)。发布者和订阅者的这种解耦允许更大的可伸缩性和更动态的网络拓扑。</p><p>请注意，在使用redis-cli时，不能使用订阅模式下的命令，如UNSUBSCRIBE和PUNSUBSCRIBE，因为redis-cli不接受任何命令，只能使用Ctrl-C退出模式。</p><div class="tip custom-block"><p class="custom-block-title">消息传递语义</p><p>Redis的Pub/Sub展示了最多一次的消息传递语义。顾名思义，它意味着消息将被传递一次。一旦消息被Redis服务器发送，就没有机会再次发送。如果订阅者无法处理消息(例如，由于错误或网络断开)，则消息将永远丢失。</p><p>如果你的应用需要更强的交付保证，你可能想了解Redis Streams。流中的消息是持久化的，并且支持最多一次和至少一次的传递语义。</p></div><h3 id="publish-向频道发送消息" tabindex="-1">PUBLISH：向频道发送消息 <a class="header-anchor" href="#publish-向频道发送消息" aria-label="Permalink to &quot;PUBLISH：向频道发送消息&quot;">​</a></h3><ul><li>语法：<code>PUBLISH channel message</code></li></ul><p>将消息发布到给定的频道。</p><p>在Redis集群中，客户端可以发布到每个节点。集群确保根据需要转发已发布的消息，因此客户机可以通过连接到任何一个节点来订阅任何通道。</p><ul><li>返回 整型回复:收到消息的客户端数量。注意，在Redis集群中，只有与发布客户端连接到同一节点的客户端才会被计算在内。</li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; PUBLISH channel-1 hello</span></span>
<span class="line"><span>(integer) 0</span></span></code></pre></div><h3 id="subscribe-订阅频道" tabindex="-1">SUBSCRIBE：订阅频道 <a class="header-anchor" href="#subscribe-订阅频道" aria-label="Permalink to &quot;SUBSCRIBE：订阅频道&quot;">​</a></h3><ul><li>语法：<code>SUBSCRIBE channel [channel ...]</code></li></ul><p>将客户端订阅到指定的通道。</p><p>一旦客户端进入订阅状态，它就不应该发出任何其他命令，除了额外的SUBSCRIBE、SSUBSCRIBE、PSUBSCRIBE、UNSUBSCRIBE、SUNSUBSCRIBE、PUNSUBSCRIBE、PING、RESET和QUIT命令。但是，如果使用了RESP3(参见HELLO)，则客户机可以在订阅状态下发出任何命令。</p><ul><li>返回 当成功时，该命令不返回任何东西。相反，对于每个通道，推送一个第一个元素为字符串“subscribe”的消息，作为命令成功的确认。</li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SUBSCRIBE channel-1 channel-2</span></span>
<span class="line"><span>Reading messages... (press Ctrl-C to quit)</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-1&quot;</span></span>
<span class="line"><span>3) (integer) 1</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-2&quot;</span></span>
<span class="line"><span>3) (integer) 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) &quot;message&quot;</span></span>
<span class="line"><span>2) &quot;channel-1&quot;</span></span>
<span class="line"><span>3) &quot;hello&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) &quot;message&quot;</span></span>
<span class="line"><span>2) &quot;channel-2&quot;</span></span>
<span class="line"><span>3) &quot;world&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>other&gt; PUBLISH channel-1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>other&gt; PUBLISH channel-2 world</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre></div><h3 id="unsubscribe-退订频道" tabindex="-1">UNSUBSCRIBE：退订频道 <a class="header-anchor" href="#unsubscribe-退订频道" aria-label="Permalink to &quot;UNSUBSCRIBE：退订频道&quot;">​</a></h3><ul><li>语法：<code>UNSUBSCRIBE [channel [channel ...]]</code></li></ul><p>取消对指定通道的订阅，如果没有指定通道，则取消对所有通道的订阅。</p><p>当没有指定通道时，客户端将从以前订阅的所有通道中取消订阅。在这种情况下，将向客户端发送每个未订阅通道的消息。</p><ul><li>返回 当成功时，该命令不返回任何东西。相反，对于每个通道，推送一个第一个元素为字符串“unsubscribe”的消息，作为命令成功的确认。</li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SUBSCRIBE channel-1 channel-2 channel-3</span></span>
<span class="line"><span>Reading messages... (press Ctrl-C to quit)</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-1&quot;</span></span>
<span class="line"><span>3) (integer) 1</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-2&quot;</span></span>
<span class="line"><span>3) (integer) 2</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-3&quot;</span></span>
<span class="line"><span>3) (integer) 3</span></span>
<span class="line"><span>(1.09s)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; UNSUBSCRIBE channel-1</span></span>
<span class="line"><span>1) &quot;unsubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-1&quot;</span></span>
<span class="line"><span>3) (integer) 0</span></span>
<span class="line"><span>&gt; UNSUBSCRIBE</span></span>
<span class="line"><span>1) &quot;unsubscribe&quot;</span></span>
<span class="line"><span>2) (nil)</span></span>
<span class="line"><span>3) (integer) 0</span></span></code></pre></div><h3 id="模式匹配订阅" tabindex="-1">模式匹配订阅 <a class="header-anchor" href="#模式匹配订阅" aria-label="Permalink to &quot;模式匹配订阅&quot;">​</a></h3><p>Redis Pub/Sub实现支持模式匹配。客户端可以订阅全局样式的模式，以接收发送到与给定模式匹配的通道名的所有消息。</p><h4 id="psubscribe-订阅模式" tabindex="-1">PSUBSCRIBE：订阅模式 <a class="header-anchor" href="#psubscribe-订阅模式" aria-label="Permalink to &quot;PSUBSCRIBE：订阅模式&quot;">​</a></h4><ul><li>语法：<code>PSUBSCRIBE pattern [pattern ...]</code></li></ul><p>为客户端订阅给定的模式。</p><p>支持的全局样式模式:</p><ul><li>h?llo表示订阅hello, hallo and hxllo</li><li>h*llo表示订阅hllo and heeeello</li><li>h[ae]llo表示订阅hello and hallo, 但不订阅hillo</li></ul><p>如果要逐字匹配特殊字符，请使用\\来转义它们。</p><p>一旦客户端进入订阅状态，它就不应该发出任何其他命令，除了额外的SUBSCRIBE、SSUBSCRIBE、PSUBSCRIBE、UNSUBSCRIBE、SUNSUBSCRIBE、PUNSUBSCRIBE、PING、RESET和QUIT命令。但是，如果使用了RESP3(参见HELLO)，则客户机可以在订阅状态下发出任何命令。</p><ul><li>返回 当成功时，该命令不返回任何东西。相反，对于每个模式，推送一个第一个元素为字符串“psubscribe”的消息，作为命令成功的确认。</li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; PSUBSCRIBE channel*</span></span>
<span class="line"><span>Reading messages... (press Ctrl-C to quit)</span></span>
<span class="line"><span>1) &quot;psubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel*&quot;</span></span>
<span class="line"><span>3) (integer) 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) &quot;pmessage&quot;</span></span>
<span class="line"><span>2) &quot;channel*&quot;</span></span>
<span class="line"><span>3) &quot;channel-1&quot;</span></span>
<span class="line"><span>4) &quot;hello&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1) &quot;pmessage&quot;</span></span>
<span class="line"><span>2) &quot;channel*&quot;</span></span>
<span class="line"><span>3) &quot;channel-2&quot;</span></span>
<span class="line"><span>4) &quot;world&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>other&gt; PUBLISH channel-1 hello</span></span>
<span class="line"><span>(integer) 1</span></span>
<span class="line"><span>other&gt; PUBLISH channel-2 world</span></span>
<span class="line"><span>(integer) 1</span></span></code></pre></div><div class="warning custom-block"><p class="custom-block-title">同时匹配模式和通道订阅的消息</p><p>如果客户端订阅了与已发布消息匹配的多个模式，或者同时订阅了与该消息匹配的模式和通道，则客户端可能会多次接收单个消息。下面的例子显示了这一点:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SUBSCRIBE foo</span></span>
<span class="line"><span>PSUBSCRIBE f*</span></span></code></pre></div><p>在上面的例子中，如果一条消息被发送到通道foo，客户端将收到两条消息:一条是message类型，另一条是pmessage类型。</p></div><h4 id="punsubscribe-退订模式" tabindex="-1">PUNSUBSCRIBE：退订模式 <a class="header-anchor" href="#punsubscribe-退订模式" aria-label="Permalink to &quot;PUNSUBSCRIBE：退订模式&quot;">​</a></h4><ul><li>语法：<code>PUNSUBSCRIBE [pattern [pattern ...]]</code></li></ul><p>取消客户端对给定模式的订阅，如果没有提供，则取消对所有模式的订阅。</p><p>当没有指定模式时，客户端将取消订阅以前订阅的所有模式。在这种情况下，将向客户端发送每个未订阅模式的消息。</p><ul><li>返回 当成功时，该命令不返回任何东西。相反，对于每个模式，推送一个第一个元素为字符串“punsubscribe”的消息，作为命令成功的确认。</li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; PSUBSCRIBE channel-1* channel-2* channel-3*</span></span>
<span class="line"><span>Reading messages... (press Ctrl-C to quit)</span></span>
<span class="line"><span>1) &quot;psubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-1*&quot;</span></span>
<span class="line"><span>3) (integer) 1</span></span>
<span class="line"><span>1) &quot;psubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-2*&quot;</span></span>
<span class="line"><span>3) (integer) 2</span></span>
<span class="line"><span>1) &quot;psubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-3*&quot;</span></span>
<span class="line"><span>3) (integer) 3</span></span>
<span class="line"><span>(1.28s)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&gt; PUNSUBSCRIBE channel-1*</span></span>
<span class="line"><span>1) &quot;punsubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-1*&quot;</span></span>
<span class="line"><span>3) (integer) 0</span></span>
<span class="line"><span>&gt; PUNSUBSCRIBE</span></span>
<span class="line"><span>1) &quot;punsubscribe&quot;</span></span>
<span class="line"><span>2) (nil)</span></span>
<span class="line"><span>3) (integer) 0</span></span></code></pre></div><h3 id="pubsub-查看发布与订阅的相关信息" tabindex="-1">PUBSUB：查看发布与订阅的相关信息 <a class="header-anchor" href="#pubsub-查看发布与订阅的相关信息" aria-label="Permalink to &quot;PUBSUB：查看发布与订阅的相关信息&quot;">​</a></h3><p>这是一个用于Pub/Sub自省命令的容器命令。要查看可用命令的列表，可以调用PUBSUB HELP。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; PUBSUB HELP</span></span>
<span class="line"><span> 1) PUBSUB &lt;subcommand&gt; [&lt;arg&gt; [value] [opt] ...]. Subcommands are:</span></span>
<span class="line"><span> 2) CHANNELS [&lt;pattern&gt;]</span></span>
<span class="line"><span> 3)     Return the currently active channels matching a &lt;pattern&gt; (default: &#39;*&#39;).</span></span>
<span class="line"><span> 4) NUMPAT</span></span>
<span class="line"><span> 5)     Return number of subscriptions to patterns.</span></span>
<span class="line"><span> 6) NUMSUB [&lt;channel&gt; ...]</span></span>
<span class="line"><span> 7)     Return the number of subscribers for the specified channels, excluding</span></span>
<span class="line"><span> 8)     pattern subscriptions(default: no channels).</span></span>
<span class="line"><span> 9) SHARDCHANNELS [&lt;pattern&gt;]</span></span>
<span class="line"><span>10)     Return the currently active shard level channels matching a &lt;pattern&gt; (default: &#39;*&#39;).</span></span>
<span class="line"><span>11) SHARDNUMSUB [&lt;shardchannel&gt; ...]</span></span>
<span class="line"><span>12)     Return the number of subscribers for the specified shard level channel(s)</span></span>
<span class="line"><span>13) HELP</span></span>
<span class="line"><span>14)     Prints this help.</span></span></code></pre></div><h4 id="pubsub-numsub-查看频道的订阅者数量" tabindex="-1">PUBSUB NUMSUB：查看频道的订阅者数量 <a class="header-anchor" href="#pubsub-numsub-查看频道的订阅者数量" aria-label="Permalink to &quot;PUBSUB NUMSUB：查看频道的订阅者数量&quot;">​</a></h4><ul><li>语法：<code>PUBSUB NUMSUB [channel [channel ...]]</code></li></ul><p>返回指定通道的订阅者数量(不包括订阅模式的客户端)。</p><p>请注意，在没有通道的情况下调用该命令是有效的。在本例中，它将返回一个空列表。</p><p>集群注意事项:在Redis集群中，客户端可以订阅每个节点，也可以向每个其他节点发布。集群将确保根据需要转发已发布的消息。也就是说，集群中的PUBSUB应答仅报告来自节点的Pub/Sub上下文的信息，而不是整个集群。</p><ul><li>返回 数组回复:通道列表和每个通道的订阅者数量。</li></ul><p>格式是channel, count, channel, count，…，所以列表是平的。列出通道的顺序与命令调用中指定的通道的顺序相同。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SUBSCRIBE channel-1 channel-2</span></span>
<span class="line"><span>Reading messages... (press Ctrl-C to quit)</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-1&quot;</span></span>
<span class="line"><span>3) (integer) 1</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-2&quot;</span></span>
<span class="line"><span>3) (integer) 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>other&gt; PUBSUB NUMSUB channel-1 channel-2 channel-3</span></span>
<span class="line"><span>1) &quot;channel-1&quot;</span></span>
<span class="line"><span>2) (integer) 1</span></span>
<span class="line"><span>3) &quot;channel-2&quot;</span></span>
<span class="line"><span>4) (integer) 1</span></span>
<span class="line"><span>5) &quot;channel-3&quot;</span></span>
<span class="line"><span>6) (integer) 0</span></span></code></pre></div><h4 id="pubsub-numpat-查看被订阅模式的总数量" tabindex="-1">PUBSUB NUMPAT：查看被订阅模式的总数量 <a class="header-anchor" href="#pubsub-numpat-查看被订阅模式的总数量" aria-label="Permalink to &quot;PUBSUB NUMPAT：查看被订阅模式的总数量&quot;">​</a></h4><ul><li>语法：<code>PUBSUB NUMPAT</code></li></ul><p>返回客户端订阅的唯一模式的数量(使用PSUBSCRIBE命令执行)。</p><p>注意，这不是订阅模式的客户机数量，而是所有客户机订阅的唯一模式的总数。</p><p>集群注意事项:在Redis集群中，客户端可以订阅每个节点，也可以向每个其他节点发布。集群将确保根据需要转发已发布的消息。也就是说，集群中的PUBSUB应答仅报告来自节点的Pub/Sub上下文的信息，而不是整个集群。</p><ul><li>返回 整数回复:所有客户端订阅的模式数。</li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; PSUBSCRIBE channel-1* channel-2* channel-3*</span></span>
<span class="line"><span>Reading messages... (press Ctrl-C to quit)</span></span>
<span class="line"><span>1) &quot;psubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-1*&quot;</span></span>
<span class="line"><span>3) (integer) 1</span></span>
<span class="line"><span>1) &quot;psubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-2*&quot;</span></span>
<span class="line"><span>3) (integer) 2</span></span>
<span class="line"><span>1) &quot;psubscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-3*&quot;</span></span>
<span class="line"><span>3) (integer) 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span>other&gt; PUBSUB NUMPAT</span></span>
<span class="line"><span>(integer) 3</span></span></code></pre></div><h4 id="pubsub-channels-查看被订阅的频道" tabindex="-1">PUBSUB CHANNELS：查看被订阅的频道 <a class="header-anchor" href="#pubsub-channels-查看被订阅的频道" aria-label="Permalink to &quot;PUBSUB CHANNELS：查看被订阅的频道&quot;">​</a></h4><ul><li>语法：<code>PUBSUB CHANNELS [pattern]</code></li></ul><p>列出当前活动的通道。</p><p>活动通道是具有一个或多个订阅者(不包括订阅模式的客户端)的Pub/Sub通道。</p><p>如果没有指定模式，则列出所有通道，否则，如果指定了pattern，则只列出与指定的全局样式模式匹配的通道。</p><p>集群注意事项:在Redis集群中，客户端可以订阅每个节点，也可以向每个其他节点发布。集群将确保根据需要转发已发布的消息。也就是说，集群中的PUBSUB应答仅报告来自节点的Pub/Sub上下文的信息，而不是整个集群。</p><ul><li>返回 数组回复:活动通道的列表，可选地匹配指定的模式。</li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SUBSCRIBE channel-1 channel-2</span></span>
<span class="line"><span>Reading messages... (press Ctrl-C to quit)</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-1&quot;</span></span>
<span class="line"><span>3) (integer) 1</span></span>
<span class="line"><span>1) &quot;subscribe&quot;</span></span>
<span class="line"><span>2) &quot;channel-2&quot;</span></span>
<span class="line"><span>3) (integer) 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>other&gt; PUBSUB CHANNELS</span></span>
<span class="line"><span>1) &quot;channel-2&quot;</span></span>
<span class="line"><span>2) &quot;channel-1&quot;</span></span>
<span class="line"><span>&gt; PUBSUB CHANNELS channel*</span></span>
<span class="line"><span>1) &quot;channel-2&quot;</span></span>
<span class="line"><span>2) &quot;channel-1&quot;</span></span></code></pre></div><h2 id="持久化" tabindex="-1">持久化 <a class="header-anchor" href="#持久化" aria-label="Permalink to &quot;持久化&quot;">​</a></h2><p>持久性是指将数据写入持久存储，例如固态磁盘(SSD)。Redis提供了一系列的持久化选项。这些包括:</p><ul><li><p><strong>RDB</strong> (Redis Database):RDB持久化以指定的时间间隔执行数据集的时间点快照。</p></li><li><p><strong>AOF</strong> (Append Only File):AOF持久化记录服务器接收到的每个写操作。然后，这些操作可以在服务器启动时再次重播，重建原始数据集。命令使用与Redis协议本身相同的格式进行记录。</p></li><li><p><strong>RDB + AOF</strong>:您还可以在同一个实例中组合使用AOF和RDB。</p></li><li><p><strong>No persistence</strong>:您可以完全禁用持久性。这有时在缓存时使用。</p></li></ul><h3 id="rdb" tabindex="-1">RDB <a class="header-anchor" href="#rdb" aria-label="Permalink to &quot;RDB&quot;">​</a></h3><h4 id="save-阻塞服务器并创建rdb文件" tabindex="-1">SAVE：阻塞服务器并创建RDB文件 <a class="header-anchor" href="#save-阻塞服务器并创建rdb文件" aria-label="Permalink to &quot;SAVE：阻塞服务器并创建RDB文件&quot;">​</a></h4><ul><li>语法：<code>SAVE</code></li></ul><p>SAVE命令执行数据集的同步保存，以RDB文件的形式生成Redis实例中所有数据的时间点快照。</p><p>您几乎不希望在生产环境中调用SAVE，因为它会阻塞所有其他客户机。相反，通常使用BGSAVE。但是，如果出现阻止Redis创建后台保存子进程的问题(例如fork(2)系统调用中的错误)，SAVE命令可以是执行最新数据集转储的最后一种好方法。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SAVE</span></span>
<span class="line"><span>OK</span></span></code></pre></div><h4 id="bgsave-以非阻塞方式创建rdb文件" tabindex="-1">BGSAVE：以非阻塞方式创建RDB文件 <a class="header-anchor" href="#bgsave-以非阻塞方式创建rdb文件" aria-label="Permalink to &quot;BGSAVE：以非阻塞方式创建RDB文件&quot;">​</a></h4><ul><li>语法：<code>BGSAVE [SCHEDULE]</code></li></ul><p>在后台保存DB。</p><p>通常会立即返回OK代码。Redis分叉，父进程继续为客户端服务，子进程将DB保存在磁盘上，然后退出。</p><p>如果已经有一个后台保存正在运行，或者有另一个非后台保存进程正在运行，特别是正在进行的AOF重写，则返回错误。</p><p>如果使用了BGSAVE SCHEDULE，当AOF重写正在进行时，该命令将立即返回OK，并安排在下一次机会时运行后台保存。</p><p>客户端可以使用LASTSAVE命令检查操作是否成功。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BGSAVE</span></span>
<span class="line"><span>Background saving started</span></span></code></pre></div><h4 id="通过配置选项自动创建rdb文件" tabindex="-1">通过配置选项自动创建RDB文件 <a class="header-anchor" href="#通过配置选项自动创建rdb文件" aria-label="Permalink to &quot;通过配置选项自动创建RDB文件&quot;">​</a></h4><p>用户除了可以使用SAVE命令和BGSAVE命令手动创建RDB文件之外，还可以通过设置save选项，让Redis服务器在满足指定条件时自动执行BGSAVE命令：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>save &lt;seconds&gt; &lt;changes&gt; [&lt;seconds&gt; &lt;changes&gt; ...]</span></span></code></pre></div><ul><li>默认设置 RDB持久化是Redis默认使用的持久化方式，如果用户在启动Redis服务器时，既没有显式地关闭RDB持久化功能，也没有启用AOF持久化功能，那么Redis默认将使用以下save选项进行RDB持久化：</li></ul><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>save 3600 1 300 100 60 10000</span></span></code></pre></div><h4 id="rdb的优点" tabindex="-1">RDB的优点 <a class="header-anchor" href="#rdb的优点" aria-label="Permalink to &quot;RDB的优点&quot;">​</a></h4><ul><li><p>RDB是Redis数据的一个非常紧凑的单文件时间点表示。RDB文件是完美的备份。例如，您可能希望在最近24小时内每小时归档RDB文件，并在30天内每天保存RDB快照。这允许您在发生灾难时轻松恢复数据集的不同版本。</p></li><li><p>RDB非常适合灾难恢复，它是一个单一的压缩文件，可以传输到远端的数据中心，也可以传输到Amazon S3(可能是加密的)。</p></li><li><p>RDB最大限度地提高了Redis的性能，因为Redis父进程为了持久化所需要做的唯一工作就是分支一个子进程来完成其余的工作。父进程永远不会执行磁盘I/O或类似的操作。</p></li><li><p>与AOF相比，RDB允许更快地重启大数据集。</p></li><li><p>在从服务器上，RDB支持重启和故障转移后的部分重新同步。</p></li></ul><h4 id="rdb的缺点" tabindex="-1">RDB的缺点 <a class="header-anchor" href="#rdb的缺点" aria-label="Permalink to &quot;RDB的缺点&quot;">​</a></h4><ul><li><p>如果你需要在Redis停止工作(例如停电后)时最小化数据丢失的机会，RDB不是很好。您可以在生成RDB的地方配置不同的保存点(例如，在对数据集进行至少5分钟和100次写操作之后，您可以有多个保存点)。然而，你通常会每五分钟或更长时间创建一个RDB快照，所以如果Redis在没有正确关机的情况下停止工作，你应该准备好丢失最近几分钟的数据。</p></li><li><p>为了使用子进程在磁盘上持久化，RDB需要经常fork()。如果数据集很大，fork()可能会很耗时，如果数据集很大，CPU性能不是很好，可能会导致Redis停止为客户端服务几毫秒甚至一秒钟。AOF也需要fork()，但频率较低，您可以调整重写日志的频率，而不会影响持久性。</p></li></ul><h3 id="aof" tabindex="-1">AOF <a class="header-anchor" href="#aof" aria-label="Permalink to &quot;AOF&quot;">​</a></h3><h4 id="打开aof持久化功能" tabindex="-1">打开AOF持久化功能 <a class="header-anchor" href="#打开aof持久化功能" aria-label="Permalink to &quot;打开AOF持久化功能&quot;">​</a></h4><p>用户可以通过服务器的appendonly选项来决定是否打开AOF持久化功能：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>appendonly &lt;value&gt;</span></span></code></pre></div><ul><li>开启AOF持久化功能</li></ul><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>appendonly yes</span></span></code></pre></div><ul><li>关闭AOF持久化功能</li></ul><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>appendonly no</span></span></code></pre></div><p>当AOF持久化功能处于打开状态时，Redis服务器在默认情况下将创建一个名为appendonly.aof的文件作为AOF文件。</p><h4 id="设置aof文件的冲洗频率" tabindex="-1">设置AOF文件的冲洗频率 <a class="header-anchor" href="#设置aof文件的冲洗频率" aria-label="Permalink to &quot;设置AOF文件的冲洗频率&quot;">​</a></h4><p>Redis向用户提供了appendfsync选项，以此来控制系统冲洗AOF文件的频率：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>appendfsync&lt;value&gt;</span></span></code></pre></div><p>appendfsync选项拥有always、everysec和no这3个值可选，它们代表的意义分别为：</p><ul><li><p>always——每执行一个写命令，就对AOF文件执行一次冲洗操作。</p></li><li><p>everysec——每隔1s，就对AOF文件执行一次冲洗操作。</p></li><li><p>no——不主动对AOF文件执行冲洗操作，由操作系统决定何时对AOF进行冲洗。</p></li></ul><p>建议的(和默认的)策略是everysec。它既快又相对安全。always策略在实践中很慢，但它支持组提交，所以如果有多个并行写，Redis将尝试执行单个fsync操作。</p><h4 id="aof重写" tabindex="-1">AOF重写 <a class="header-anchor" href="#aof重写" aria-label="Permalink to &quot;AOF重写&quot;">​</a></h4><p>用户可以通过执行BGREWRITEAOF命令或者设置相关的配置选项来触发AOF重写操作。</p><h5 id="bgrewriteaof命令" tabindex="-1">BGREWRITEAOF命令 <a class="header-anchor" href="#bgrewriteaof命令" aria-label="Permalink to &quot;BGREWRITEAOF命令&quot;">​</a></h5><p>用户可以通过执行BGREWRITEAOF命令显式地触发AOF重写操作，该命令是一个无参数命令：</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; BGREWRITEAOF</span></span>
<span class="line"><span>Background append only file rewriting started</span></span></code></pre></div><h5 id="aof重写配置选项" tabindex="-1">AOF重写配置选项 <a class="header-anchor" href="#aof重写配置选项" aria-label="Permalink to &quot;AOF重写配置选项&quot;">​</a></h5><p>用户除了可以手动执行BGREWRITEAOF命令创建新的AOF文件之外，还可以通过设置以下两个配置选项让Redis自动触发BGREWRITEAOF命令：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>auto-aof-rewrite-min-size &lt;value&gt;</span></span>
<span class="line"><span>auto-aof-rewrite-percentage &lt;value&gt;</span></span></code></pre></div><p>其中auto-aof-rewrite-min-size选项用于设置触发自动AOF文件重写所需的最小AOF文件体积，当AOF文件的体积小于给定值时，服务器将不会自动执行BGREWRITEAOF命令。在默认情况下，该选项的值为：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>auto-aof-rewrite-min-size 64mb</span></span></code></pre></div><p>也就是说，如果AOF文件的体积小于64MB，那么Redis将不会自动执行 BGREWRI-TEAOF命令。</p><p>至于另一个选项，它控制的是触发自动AOF文件重写所需的文件体积增大比例。举个例子，对于该选项的默认值：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>auto-aof-rewrite-percentage 100</span></span></code></pre></div><p>表示如果当前AOF文件的体积比最后一次AOF文件重写之后的体积增大了一倍（100%），那么将自动执行一次BGREWRITEAOF命令。如果Redis服务器刚刚启动，还没有执行过AOF文件重写操作，那么启动服务器时使用的AOF文件的体积将被用作最后一次AOF文件重写的体积。</p><p>举个例子，如果服务器启动时AOF文件的体积为200MB，而auto-aof-rewrite-percentage选项的值为100，那么当AOF文件的体积增大至超过400MB时，服务器就会自动进行一次AOF重写。与此类似，在同样设置下，如果AOF文件的体积从最后一次重写之后的300MB增大至超过600MB，那么服务器将再次执行AOF重写操作。</p><h4 id="aof的优点" tabindex="-1">AOF的优点 <a class="header-anchor" href="#aof的优点" aria-label="Permalink to &quot;AOF的优点&quot;">​</a></h4><ul><li><p>使用AOF Redis更持久:你可以有不同的fsync策略:根本不fsync，每秒fsync，每次查询fsync。在默认的每秒fsync策略下，写性能仍然很好。Fsync是使用后台线程执行的，主线程在没有Fsync的情况下会努力执行写操作，所以你只会损失一秒钟的写时间。</p></li><li><p>AOF日志是一个只能追加的日志，因此在停电时不会出现查找和损坏问题。即使日志由于某种原因(磁盘已满或其他原因)以未写完的命令结束，redis-check-aof工具也能够轻松修复它。</p></li><li><p>Redis能够在后台自动重写AOF，当它变得太大。重写是完全安全的，因为当Redis继续附加到旧文件时，一个全新的文件将产生，并且使用创建当前数据集所需的最小操作集，一旦第二个文件准备好，Redis切换两个文件并开始附加到新文件。</p></li><li><p>AOF以易于理解和解析的格式包含所有操作的一个接一个的日志。您甚至可以轻松地导出AOF文件。例如，即使您使用FLUSHALL命令意外刷新了所有内容，只要在此期间没有执行日志重写，您仍然可以通过停止服务器，删除最新命令并重新启动Redis来保存数据集。</p></li></ul><h4 id="aof的缺点" tabindex="-1">AOF的缺点 <a class="header-anchor" href="#aof的缺点" aria-label="Permalink to &quot;AOF的缺点&quot;">​</a></h4><ul><li><p>对于相同的数据集，AOF文件通常比同等的RDB文件大。</p></li><li><p>AOF可能比RDB慢，这取决于确切的fsync策略。一般来说，将fsync设置为每秒的性能仍然非常高，并且在禁用fsync的情况下，即使在高负载下，它也应该与RDB一样快。尽管如此，即使在写负载很大的情况下，RDB也能够提供更多关于最大延迟的保证。</p></li></ul><h5 id="redis-7-0" tabindex="-1">Redis &lt; 7.0 <a class="header-anchor" href="#redis-7-0" aria-label="Permalink to &quot;Redis &lt; 7.0&quot;">​</a></h5><ul><li><p>如果在重写过程中有对数据库的写操作，AOF可能会使用大量内存(这些操作在内存中进行缓冲，并在最后写入新的AOF)。</p></li><li><p>在重写期间到达的所有写命令都被写入磁盘两次。</p></li><li><p>Redis可以冻结写，并在重写结束时将这些写命令同步到新的AOF文件。</p></li></ul><h3 id="rdb-aof混合持久化" tabindex="-1">RDB-AOF混合持久化 <a class="header-anchor" href="#rdb-aof混合持久化" aria-label="Permalink to &quot;RDB-AOF混合持久化&quot;">​</a></h3><p>由于RDB持久化和AOF持久化都有各自的优缺点，因此在很长一段时间里，如何选择合适的持久化方式成了很多Redis用户面临的一个难题。为了解决这个问题，Redis从4.0版本开始引入RDB-AOF混合持久化模式，这种模式是基于AOF持久化模式构建而来的——如果用户打开了服务器的AOF持久化功能，并且将<code>aof-use-rdb-preamble &lt;value&gt;</code>选项的值设置成了yes，那么Redis服务器在执行AOF重写操作时，就会像执行BGSAVE命令那样，根据数据库当前的状态生成出相应的RDB数据，并将这些数据写入新建的AOF文件中，至于那些在AOF重写开始之后执行的Redis命令，则会继续以协议文本的方式追加到新AOF文件的 末尾，即已有的RDB数据的后面。</p><h3 id="无持久化" tabindex="-1">无持久化 <a class="header-anchor" href="#无持久化" aria-label="Permalink to &quot;无持久化&quot;">​</a></h3><p>即使用户没有显式地开启RDB持久化功能和AOF持久化功能，Redis服务器也会默认使用以下配置进行RDB持久化：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>save 3600 1 300 100 60 10000</span></span></code></pre></div><p>如果用户想要彻底关闭这一默认的RDB持久化行为，让Redis服务器处于完全的无持久化状态，那么可以在服务器启动时向它提供以下配置选项：</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>save &quot;&quot;</span></span></code></pre></div><p>这样一来，服务器将不会再进行默认的RDB持久化，从而使得服务器处于完全的无持久化状态中。处于这一状态的服务器在关机之后将丢失关机之前存储的所有数据，这种服务器可以用作单纯的内存缓存服务器。</p><h2 id="主从复制" tabindex="-1">主从复制 <a class="header-anchor" href="#主从复制" aria-label="Permalink to &quot;主从复制&quot;">​</a></h2><h3 id="replicaof-将服务器设置为从服务器" tabindex="-1">REPLICAOF：将服务器设置为从服务器 <a class="header-anchor" href="#replicaof-将服务器设置为从服务器" aria-label="Permalink to &quot;REPLICAOF：将服务器设置为从服务器&quot;">​</a></h3><ul><li>语法：<code>REPLICAOF host port</code></li></ul><p>REPLICAOF命令可以动态地更改从服务器的复制设置。</p><p>如果一个Redis服务器已经作为从服务器，命令REPLICAOF NO ONE将关闭复制，将Redis服务器变为MASTER。以适当的形式，REPLICAOF主机名端口将使服务器成为侦听指定主机名和端口的另一台服务器的从服务器。</p><p>如果服务器已经是某个主服务器的从服务器，REPLICAOF host port将停止对旧服务器的复制，并开始对新服务器的同步，丢弃旧数据集。</p><p>使用REPLICAOF NO ONE将停止复制，将服务器变为MASTER，但不会丢弃复制。因此，如果旧的主服务器停止工作，可以将从服务器转换为主服务器，并设置应用程序在读/写时使用这个新的主服务器。当其他Redis服务器被修复后，它可以被重新配置为一个从服务器。</p><ul><li>返回 简单字符串回复</li></ul><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>127.0.0.1:6380&gt; REPLICAOF 127.0.0.1 6379</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span></span></span>
<span class="line"><span>127.0.0.1:6379&gt; SET mykey hello</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span></span></span>
<span class="line"><span>127.0.0.1:6380&gt; GET mykey</span></span>
<span class="line"><span>&quot;hello&quot;</span></span></code></pre></div><h4 id="通过配置选项设置从服务器" tabindex="-1">通过配置选项设置从服务器 <a class="header-anchor" href="#通过配置选项设置从服务器" aria-label="Permalink to &quot;通过配置选项设置从服务器&quot;">​</a></h4><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>replicaof &lt;masterip&gt; &lt;masterport&gt;</span></span></code></pre></div><h4 id="取消复制" tabindex="-1">取消复制 <a class="header-anchor" href="#取消复制" aria-label="Permalink to &quot;取消复制&quot;">​</a></h4><p>使用REPLICAOF NO ONE将停止复制，将服务器变为MASTER，但不会丢弃复制。</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>127.0.0.1:6380&gt; REPLICAOF NO ONE</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6380&gt; GET mykey</span></span>
<span class="line"><span>&quot;hello&quot;</span></span></code></pre></div><h3 id="role-查看服务器的角色" tabindex="-1">ROLE：查看服务器的角色 <a class="header-anchor" href="#role-查看服务器的角色" aria-label="Permalink to &quot;ROLE：查看服务器的角色&quot;">​</a></h3><ul><li>语法：<code>ROLE</code></li></ul><p>通过返回当前Redis实例是主、从还是哨兵（master, 从服务器, or sentinel），提供Redis实例在复制上下文中所扮演角色的信息。该命令还返回关于复制状态的附加信息(如果角色是master或从服务器)或被监视的主名称列表(如果角色是sentinel)。</p><h4 id="返回值-12" tabindex="-1">返回值 <a class="header-anchor" href="#返回值-12" aria-label="Permalink to &quot;返回值&quot;">​</a></h4><p>数组回复:其中第一个元素是master, 从服务器, sentinel中的一个，其他元素是角色特定的，如下所示。</p><h5 id="master" tabindex="-1">master <a class="header-anchor" href="#master" aria-label="Permalink to &quot;master&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1) &quot;master&quot;</span></span>
<span class="line"><span>2) (integer) 3129659</span></span>
<span class="line"><span>3) 1) 1) &quot;127.0.0.1&quot;</span></span>
<span class="line"><span>      2) &quot;9001&quot;</span></span>
<span class="line"><span>      3) &quot;3129242&quot;</span></span>
<span class="line"><span>   2) 1) &quot;127.0.0.1&quot;</span></span>
<span class="line"><span>      2) &quot;9002&quot;</span></span>
<span class="line"><span>      3) &quot;3129543&quot;</span></span></code></pre></div><p>master输出由以下几个部分组成:</p><ol><li>字符串master。</li><li>在部分重同步中，当前主复制偏移量是主复制和从服务器共享以理解的偏移量，是从服务器需要获取以继续的复制流的一部分。</li><li>由三个元素组成的数组，表示连接的从服务器。每个子阵列都包含从服务器IP、端口和最后确认的复制偏移量。</li></ol><h5 id="从服务器" tabindex="-1">从服务器 <a class="header-anchor" href="#从服务器" aria-label="Permalink to &quot;从服务器&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1) &quot;从服务器&quot;</span></span>
<span class="line"><span>2) &quot;127.0.0.1&quot;</span></span>
<span class="line"><span>3) (integer) 9000</span></span>
<span class="line"><span>4) &quot;connected&quot;</span></span>
<span class="line"><span>5) (integer) 3167038</span></span></code></pre></div><p>从服务器输出由以下几个部分组成:</p><ol><li>字符串从服务器。</li><li>master的IP。</li><li>master的端口号。</li><li>从主节点的角度来看，复制的状态可以是connect(实例需要连接到它的主节点)、connecting(主-从服务器连接正在进行中)、sync(主节点和从服务器正在尝试执行同步)、connected(从服务器在线)。</li><li>迄今为止以主复制偏移量表示的从从服务器接收的数据量。</li></ol><h5 id="sentinel" tabindex="-1">sentinel <a class="header-anchor" href="#sentinel" aria-label="Permalink to &quot;sentinel&quot;">​</a></h5><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>1) &quot;sentinel&quot;</span></span>
<span class="line"><span>2) 1) &quot;resque-master&quot;</span></span>
<span class="line"><span>   2) &quot;html-fragments-master&quot;</span></span>
<span class="line"><span>   3) &quot;stats-master&quot;</span></span>
<span class="line"><span>   4) &quot;metadata-master&quot;</span></span></code></pre></div><p>sentinel 输出由以下几个部分组成:</p><ol><li>字符串sentinel 。</li><li>这个Sentinel实例监视的主名称数组。</li></ol><h4 id="示例-14" tabindex="-1">示例 <a class="header-anchor" href="#示例-14" aria-label="Permalink to &quot;示例&quot;">​</a></h4><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>127.0.0.1:6380&gt; ROLE</span></span>
<span class="line"><span>1) &quot;master&quot;</span></span>
<span class="line"><span>2) (integer) 1661</span></span>
<span class="line"><span>3) (empty array)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>127.0.0.1:6380&gt; REPLICAOF 127.0.0.1 6379</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:6380&gt; ROLE</span></span>
<span class="line"><span>1) &quot;从服务器&quot;</span></span>
<span class="line"><span>2) &quot;127.0.0.1&quot;</span></span>
<span class="line"><span>3) (integer) 6379</span></span>
<span class="line"><span>4) &quot;handshake&quot;</span></span>
<span class="line"><span>5) (integer) -1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>127.0.0.1:6380&gt; ROLE</span></span>
<span class="line"><span>1) &quot;从服务器&quot;</span></span>
<span class="line"><span>2) &quot;127.0.0.1&quot;</span></span>
<span class="line"><span>3) (integer) 6379</span></span>
<span class="line"><span>4) &quot;connected&quot;</span></span>
<span class="line"><span>5) (integer) 1703</span></span>
<span class="line"><span></span></span>
<span class="line"><span>127.0.0.1:6379&gt; ROLE</span></span>
<span class="line"><span>1) &quot;master&quot;</span></span>
<span class="line"><span>2) (integer) 1899</span></span>
<span class="line"><span>3) 1) 1) &quot;127.0.0.1&quot;</span></span>
<span class="line"><span>      2) &quot;6380&quot;</span></span>
<span class="line"><span>      3) &quot;1899&quot;</span></span></code></pre></div><h2 id="哨兵" tabindex="-1">哨兵 <a class="header-anchor" href="#哨兵" aria-label="Permalink to &quot;哨兵&quot;">​</a></h2><p>Redis Sentinel在不使用Redis Cluster的情况下为Redis提供高可用性。</p><p>Redis Sentinel还提供其他附属任务，如监控、通知，并作为客户端的配置提供者。</p><p>以下是Sentinel在宏观层面上的完整功能列表(即大局):</p><ul><li><p>监控。Sentinel不断检查主实例和从服务器实例是否按预期工作。</p></li><li><p>通知。Sentinel可以通过API通知系统管理员或其他计算机程序，被监视的Redis实例之一出现了问题。</p></li><li><p><strong>自动故障转移</strong>。如果一个主服务器没有像预期的那样工作，Sentinel可以启动一个故障转移过程，其中一个从服务器被提升为主服务器，其他额外的从服务器被重新配置为使用新的主服务器，并且使用Redis服务器的应用程序在连接时被告知使用的新地址。</p></li><li><p>配置提供者。哨兵作为客户端服务发现的权威来源:客户端连接到哨兵以请求当前负责给定服务的Redis主服务器的地址。如果发生故障转移，哨兵将报告新的地址。</p></li></ul><div class="tip custom-block"><p class="custom-block-title">哨兵作为一个分布式系统</p><p>Redis Sentinel是一个分布式系统:</p><p>Sentinel本身被设计为在多个Sentinel进程协同工作的配置中运行。多个哨兵进程协作的优势如下:</p><ol><li><p>故障检测是在多个哨兵一致认为某个主服务器不再可用时执行的。这降低了误报的概率。</p></li><li><p>即使不是所有的Sentinel进程都在工作，Sentinel也能工作，使系统对故障具有健壮性。毕竟，拥有一个本身就是单点故障的故障转移系统是没有乐趣的。</p></li></ol><p>哨兵、Redis实例(主和从服务器)以及连接到哨兵和Redis的客户端的总和，也是一个具有特定属性的更大的分布式系统。在本文档中，概念将逐步介绍，从基本信息开始，以便了解Sentinel的基本属性，到更复杂的信息(可选的)，以便了解Sentinel的确切工作原理。</p></div><h3 id="部署sentinel之前需要了解的基本事项" tabindex="-1">部署Sentinel之前需要了解的基本事项 <a class="header-anchor" href="#部署sentinel之前需要了解的基本事项" aria-label="Permalink to &quot;部署Sentinel之前需要了解的基本事项&quot;">​</a></h3><ol><li>要进行健壮的部署，至少需要三个Sentinel实例。</li><li>这三个Sentinel实例应该被放置在被认为会以独立的方式失败的计算机或虚拟机中。例如，不同的物理服务器或虚拟机在不同的可用性区域上执行。</li><li>Sentinel + Redis分布式系统不保证在故障期间保留已确认的写，因为Redis使用异步复制。然而，有一些方法可以部署Sentinel，使窗口只在特定时刻丢失写，同时还有其他不太安全的部署方法。</li><li>你的客户需要哨兵的支持。流行的客户端库支持Sentinel，但不是全部。</li><li>如果不经常在开发环境中进行测试，那么就没有安全的HA设置，如果可以的话，在生产环境中进行测试就更好了。你可能有一个错误的配置，只有在太晚的时候才会变得明显(在凌晨3点，你的主机停止工作)。</li><li>Sentinel、Docker或其他形式的网络地址转换或端口映射应该小心混合:Docker执行端口重新映射，破坏Sentinel自动发现其他Sentinel进程和master的从服务器列表。更多信息，请查看本文档后面关于Sentinel和Docker的部分。</li></ol><h3 id="启动sentinel" tabindex="-1">启动Sentinel <a class="header-anchor" href="#启动sentinel" aria-label="Permalink to &quot;启动Sentinel&quot;">​</a></h3><p>如果你正在使用redis-sentinel可执行文件(或者你有一个与redis-server可执行文件同名的符号链接)，你可以用下面的命令行运行Sentinel:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-sentinel</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel.conf</span></span></code></pre></div><p>或者也可以直接使用redis-server可执行文件，以Sentinel模式启动它:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel.conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --sentinel</span></span></code></pre></div><p>但是，在运行Sentinel时必须使用配置文件，因为系统将使用该文件来保存在重新启动时将重新加载的当前状态。如果没有提供配置文件或者配置文件路径不可写，Sentinel将拒绝启动。</p><p>默认情况下，Sentinels会监听到TCP端口26379的连接，因此要使Sentinels工作，服务器的端口26379必须打开以接收来自其他Sentinel实例的IP地址的连接。否则哨兵就无法交谈，也无法就该做什么达成一致，所以故障转移永远不会执行。</p><ul><li>默认sentinel.conf内容</li></ul><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span># port &lt;sentinel-port&gt;</span></span>
<span class="line"><span># The port that this sentinel instance will run on</span></span>
<span class="line"><span>port 26379</span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span>
<span class="line"><span></span></span>
<span class="line"><span># sentinel monitor &lt;master-name&gt; &lt;ip&gt; &lt;redis-port&gt; &lt;quorum&gt;</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Tells Sentinel to monitor this master, and to consider it in O_DOWN</span></span>
<span class="line"><span># (Objectively Down) state only if at least &lt;quorum&gt; sentinels agree.</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Note that whatever is the ODOWN quorum, a Sentinel will require to</span></span>
<span class="line"><span># be elected by the majority of the known Sentinels in order to</span></span>
<span class="line"><span># start a failover, so no failover can be performed in minority.</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Replicas are auto-discovered, so you don&#39;t need to specify replicas in</span></span>
<span class="line"><span># any way. Sentinel itself will rewrite this configuration file adding</span></span>
<span class="line"><span># the replicas using additional configuration options.</span></span>
<span class="line"><span># Also note that the configuration file is rewritten when a</span></span>
<span class="line"><span># replica is promoted to master.</span></span>
<span class="line"><span>#</span></span>
<span class="line"><span># Note: master name should not include special characters or spaces.</span></span>
<span class="line"><span># The valid charset is A-z 0-9 and the three characters &quot;.-_&quot;.</span></span>
<span class="line"><span>sentinel monitor mymaster 127.0.0.1 6379 2</span></span>
<span class="line"><span></span></span>
<span class="line"><span>...</span></span></code></pre></div><h3 id="配置sentinel" tabindex="-1">配置Sentinel <a class="header-anchor" href="#配置sentinel" aria-label="Permalink to &quot;配置Sentinel&quot;">​</a></h3><p>Redis源代码发行版包含一个名为Sentinel .conf的文件，这是一个自定义的示例配置文件，你可以使用它来配置Sentinel，但是一个典型的最小配置文件看起来像下面这样:</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sentinel monitor mymaster 127.0.0.1 6379 2</span></span>
<span class="line"><span>sentinel down-after-milliseconds mymaster 60000</span></span>
<span class="line"><span>sentinel failover-timeout mymaster 180000</span></span>
<span class="line"><span>sentinel parallel-syncs mymaster 1</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sentinel monitor resque 192.168.1.3 6380 4</span></span>
<span class="line"><span>sentinel down-after-milliseconds resque 10000</span></span>
<span class="line"><span>sentinel failover-timeout resque 180000</span></span>
<span class="line"><span>sentinel parallel-syncs resque 5</span></span></code></pre></div><p>您只需要指定要监视的主服务器，为每个分离的主服务器(可能有任意数量的从服务器)指定不同的名称。不需要指定从服务器，从服务器是自动发现的。Sentinel将使用关于从服务器的其他信息自动更新配置(以便在重新启动时保留这些信息)。每次在故障转移期间将从服务器提升为主从服务器以及每次发现新的Sentinel时，都会重写配置。</p><p>上面的示例配置基本上监视两组Redis实例，每个实例由一个主实例和一个未定义数量的从服务器组成。一组实例称为mymaster，另一组实例称为resque。</p><p>sentinel monitor语句的参数含义如下:</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sentinel monitor &lt;master-name&gt; &lt;ip&gt; &lt;port&gt; &lt;quorum&gt;</span></span></code></pre></div><p>第一行用于告诉Redis监控一个名为mymaster的主机，该主机的地址为127.0.0.1，端口为6379,quorum为2。一切都很明显，但法定人数的论点:</p><ul><li><p>quorum是需要就主服务器不可达这一事实达成一致的哨兵数量，以便真正将主服务器标记为故障，并在可能的情况下最终启动故障转移过程。</p></li><li><p>然而，仲裁仅用于检测故障。为了实际执行故障转移，一个哨兵需要被选为故障转移的领导者，并被授权继续进行。这只发生在大多数哨兵进程投票的情况下。</p></li></ul><p>例如，如果您有5个哨兵进程，并且给定主服务器的仲裁设置为2，则会发生以下情况:</p><ul><li><p>如果两个哨兵同时同意主节点不可达，其中一个将尝试启动故障转移。</p></li><li><p>如果总共至少有三个哨兵可达，则将授权并实际启动故障转移。</p></li></ul><p>实际上，这意味着在故障期间，如果大多数Sentinel进程无法通信(也就是在少数分区中没有故障转移)，则Sentinel永远不会启动故障转移。</p><h4 id="其他sentinel选项" tabindex="-1">其他Sentinel选项 <a class="header-anchor" href="#其他sentinel选项" aria-label="Permalink to &quot;其他Sentinel选项&quot;">​</a></h4><p>其他选项几乎总是在表单中:</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>sentinel &lt;option_name&gt; &lt;master_name&gt; &lt;option_value&gt;</span></span></code></pre></div><p>并用于以下目的:</p><ul><li><p>down-after-milliseconds是指一个实例在Sentinel开始认为它已经关闭时无法访问的时间，以毫秒为单位(要么没有回复我们的ping，要么正在回复错误)。</p></li><li><p>parallel-syncs设置可在故障转移后同时重新配置以使用新主服务器的从服务器数量。这个数字越低，完成故障转移过程所需的时间就越长，但是，如果将从服务器配置为提供旧数据，则可能不希望所有从服务器同时与主服务器重新同步。虽然复制过程对于从服务器来说大部分是无阻塞的，但它会停止从主服务器加载批量数据。您可能希望通过将该选项设置为1来确保一次只有一个从服务器不可访问。</p></li></ul><p>其他选项将在本文档的其余部分进行描述，并在Redis发行版附带的示例sentinel.conf文件中进行记录。</p><p>配置参数可以在运行时修改:</p><ul><li><p>使用SENTINEL SET修改特定于主的配置参数。</p></li><li><p>使用SENTINEL CONFIG SET修改全局配置参数。</p></li></ul><p>有关更多信息，请参阅<a href="#在运行时重新配置sentinel">在运行时重新配置Sentinel</a>部分。</p><h3 id="快速教程" tabindex="-1">快速教程 <a class="header-anchor" href="#快速教程" aria-label="Permalink to &quot;快速教程&quot;">​</a></h3><p>在本文的下一节中，将逐步介绍有关Sentinel API、配置和语义的所有细节。然而，对于那些想要尽快使用系统的人来说，这部分是一个教程，展示了如何配置和与3个哨兵实例交互。</p><p>这里我们假设实例在端口5000、5001、5002上执行。我们还假设您在端口6379上运行Redis master，在端口6380上运行从服务器。在本教程中，我们将在任何地方使用IPv4环回地址127.0.0.1，假设您在个人计算机上运行模拟。</p><p>三个Sentinel配置文件如下所示:</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>port 5000</span></span>
<span class="line"><span>sentinel monitor mymaster 127.0.0.1 6379 2</span></span>
<span class="line"><span>sentinel down-after-milliseconds mymaster 5000</span></span>
<span class="line"><span>sentinel failover-timeout mymaster 60000</span></span>
<span class="line"><span>sentinel parallel-syncs mymaster 1</span></span></code></pre></div><p>其他两个配置文件将是相同的，但使用5001和5002作为端口号。</p><p>关于上述配置，有几点需要注意:</p><ul><li><p>这个主集叫做mymaster。它能识别主人和从服务器。由于每个主集都有不同的名称，因此Sentinel可以同时监视不同的主集和从服务器集。</p></li><li><p>将quorum值设置为2(哨兵监视器配置指令的最后一个参数)。</p></li><li><p>down-after-milliseconds的值是5000毫秒，也就是5秒，所以只要我们在这段时间内没有收到来自ping的任何回复，就会检测到主服务器失败。</p></li></ul><p>一旦你启动了三个哨兵，你会看到他们记录的一些消息，比如:</p><div class="language-log vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">log</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">+monitor master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> quorum </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span></code></pre></div><p>这是一个哨兵事件，如果您订阅后面在Pub/Sub消息部分中指定的事件名称，则可以通过Pub/Sub接收此类事件。</p><p>Sentinel在故障检测和故障转移期间生成并记录不同的事件。</p><h4 id="向哨兵询问主人的状态" tabindex="-1">向哨兵询问主人的状态 <a class="header-anchor" href="#向哨兵询问主人的状态" aria-label="Permalink to &quot;向哨兵询问主人的状态&quot;">​</a></h4><p>对于Sentinel来说，最明显的事情就是检查它所监控的主机是否运行良好:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ redis-cli -p 5000</span></span>
<span class="line"><span>127.0.0.1:5000&gt; sentinel master mymaster</span></span>
<span class="line"><span> 1) &quot;name&quot;</span></span>
<span class="line"><span> 2) &quot;mymaster&quot;</span></span>
<span class="line"><span> 3) &quot;ip&quot;</span></span>
<span class="line"><span> 4) &quot;127.0.0.1&quot;</span></span>
<span class="line"><span> 5) &quot;port&quot;</span></span>
<span class="line"><span> 6) &quot;6379&quot;</span></span>
<span class="line"><span> 7) &quot;runid&quot;</span></span>
<span class="line"><span> 8) &quot;953ae6a589449c13ddefaee3538d356d287f509b&quot;</span></span>
<span class="line"><span> 9) &quot;flags&quot;</span></span>
<span class="line"><span>10) &quot;master&quot;</span></span>
<span class="line"><span>11) &quot;link-pending-commands&quot;</span></span>
<span class="line"><span>12) &quot;0&quot;</span></span>
<span class="line"><span>13) &quot;link-refcount&quot;</span></span>
<span class="line"><span>14) &quot;1&quot;</span></span>
<span class="line"><span>15) &quot;last-ping-sent&quot;</span></span>
<span class="line"><span>16) &quot;0&quot;</span></span>
<span class="line"><span>17) &quot;last-ok-ping-reply&quot;</span></span>
<span class="line"><span>18) &quot;735&quot;</span></span>
<span class="line"><span>19) &quot;last-ping-reply&quot;</span></span>
<span class="line"><span>20) &quot;735&quot;</span></span>
<span class="line"><span>21) &quot;down-after-milliseconds&quot;</span></span>
<span class="line"><span>22) &quot;5000&quot;</span></span>
<span class="line"><span>23) &quot;info-refresh&quot;</span></span>
<span class="line"><span>24) &quot;126&quot;</span></span>
<span class="line"><span>25) &quot;role-reported&quot;</span></span>
<span class="line"><span>26) &quot;master&quot;</span></span>
<span class="line"><span>27) &quot;role-reported-time&quot;</span></span>
<span class="line"><span>28) &quot;532439&quot;</span></span>
<span class="line"><span>29) &quot;config-epoch&quot;</span></span>
<span class="line"><span>30) &quot;1&quot;</span></span>
<span class="line"><span>31) &quot;num-从服务器s&quot;</span></span>
<span class="line"><span>32) &quot;1&quot;</span></span>
<span class="line"><span>33) &quot;num-other-sentinels&quot;</span></span>
<span class="line"><span>34) &quot;2&quot;</span></span>
<span class="line"><span>35) &quot;quorum&quot;</span></span>
<span class="line"><span>36) &quot;2&quot;</span></span>
<span class="line"><span>37) &quot;failover-timeout&quot;</span></span>
<span class="line"><span>38) &quot;60000&quot;</span></span>
<span class="line"><span>39) &quot;parallel-syncs&quot;</span></span>
<span class="line"><span>40) &quot;1&quot;</span></span></code></pre></div><p>正如您所看到的，它打印了许多关于主机的信息。其中有一些是我们特别感兴趣的:</p><ol><li>num-other-sentinels是2，所以我们知道哨兵已经为这个主人发现了另外两个哨兵。如果您检查日志，您将看到生成的+sentinel事件。</li><li>flags只是master。如果主服务器关闭，我们也可以看到s_down或o_down标志。</li><li>num-从服务器s被正确地设置为1，所以Sentinel也检测到有一个附加的从服务器到我们的主服务器。</li></ol><p>为了更深入地了解这个实例，您可能想尝试以下两个命令:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>SENTINEL replicas mymaster</span></span>
<span class="line"><span>SENTINEL sentinels mymaster</span></span></code></pre></div><p>第一个将提供有关连接到主的从服务器的类似信息，第二个将提供有关其他哨兵的信息。</p><h4 id="获取当前主机的地址" tabindex="-1">获取当前主机的地址 <a class="header-anchor" href="#获取当前主机的地址" aria-label="Permalink to &quot;获取当前主机的地址&quot;">​</a></h4><p>正如我们已经指定的，Sentinel还充当想要连接到一组主从服务器和从服务器的客户机的配置提供者。由于可能的故障转移或重新配置，客户端不知道谁是给定实例集的当前活动主，因此Sentinel导出一个API来询问这个问题:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>127.0.0.1:5000&gt; SENTINEL get-master-addr-by-name mymaster</span></span>
<span class="line"><span>1) &quot;127.0.0.1&quot;</span></span>
<span class="line"><span>2) &quot;6379&quot;</span></span></code></pre></div><h4 id="测试故障转移" tabindex="-1">测试故障转移 <a class="header-anchor" href="#测试故障转移" aria-label="Permalink to &quot;测试故障转移&quot;">​</a></h4><p>此时，我们的玩具哨兵部署已经准备好进行测试了。我们可以干掉主程序，看看配置是否改变了。要做到这一点，我们可以这样做:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-cli</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> DEBUG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sleep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 30</span></span></code></pre></div><p>这个命令将使我们的主人无法访问，睡眠30秒。它基本上是出于某种原因模拟了主人的绞刑。</p><p>如果你检查哨兵日志，你应该能够看到很多动作:</p><ol><li>每个Sentinel检测到主服务器宕机并触发+sdown事件。</li><li>此事件随后升级为+odown，这意味着多个哨兵同意无法到达主节点的事实。</li><li>哨兵投票给哨兵，哨兵将开始第一次故障转移尝试。</li><li>发生故障转移。</li></ol><p>如果你再次询问mymaster当前的主地址是什么，最终我们这次应该会得到不同的回复:</p><p>到目前为止一切都好……此时，您可以跳转到创建Sentinel部署，也可以阅读更多内容以了解Sentinel的所有命令和内部原理。</p><h3 id="sentinel-api" tabindex="-1">Sentinel API <a class="header-anchor" href="#sentinel-api" aria-label="Permalink to &quot;Sentinel API&quot;">​</a></h3><p>Sentinel提供了一个API，用于检查其状态、检查被监视的主服务器和从服务器的运行状况、订阅以接收特定通知，以及在运行时更改Sentinel配置。</p><p>默认情况下，Sentinel使用TCP端口26379运行(注意6379是正常的Redis端口)。Sentinels接受使用Redis协议的命令，所以你可以使用redis-cli或任何其他未修改的Redis客户端来与Sentinel交谈。</p><p>可以直接查询一个哨兵，从它的角度检查被监控的Redis实例的状态，看看它知道的其他哨兵，等等。或者，使用Pub/Sub，可以在每次发生某些事件(如故障转移或实例进入错误条件等)时从Sentinels接收推送样式的通知。</p><h4 id="sentinel命令" tabindex="-1">Sentinel命令 <a class="header-anchor" href="#sentinel命令" aria-label="Permalink to &quot;Sentinel命令&quot;">​</a></h4><p>SENTINEL命令是SENTINEL的主要API。以下是它的子命令列表(在适用的地方注明了最小版本):</p><ul><li><p><code>SENTINEL CONFIG GET &lt;name&gt;</code>(&gt;= 6.2)获取全局SENTINEL配置参数的当前值。指定的名称可以是通配符，类似于Redis CONFIG GET命令。</p></li><li><p><code>SENTINEL CONFIG SET &lt;name&gt; &lt;value&gt;</code>(&gt;= 6.2)设置全局SENTINEL配置参数的值。</p></li><li><p><code>SENTINEL CKQUORUM &lt;master name&gt;</code>检查当前SENTINEL配置是否能够达到主服务器故障转移所需的仲裁数量，以及授权故障转移所需的多数数量。该命令应该用于监视系统，以检查Sentinel部署是否正常。</p></li><li><p><code>SENTINEL FLUSHCONFIG</code>强制SENTINEL重写磁盘上的配置，包括当前的SENTINEL状态。通常情况下，每当状态发生变化时(在重新启动时保留在磁盘上的状态子集的上下文中)，Sentinel都会重写配置。但是，有时可能由于操作错误、磁盘故障、包升级脚本或配置管理器而丢失配置文件。在这些情况下，强制Sentinel重写配置文件的方法很方便。即使以前的配置文件完全丢失，该命令也可以工作。</p></li><li><p><code>SENTINEL FAILOVER &lt;master name&gt;</code>强制故障转移，如果主不可达，而不要求其他哨兵的同意(然而，一个新版本的配置将被发布，以便其他哨兵将更新他们的配置)。</p></li><li><p><code>SENTINEL GET-MASTER-ADDR-BY-NAME &lt;master name&gt;</code>返回该名称的master的ip和端口号。如果这个主机的故障转移正在进行或成功终止，它将返回提升从服务器的地址和端口。</p></li><li><p><code>SENTINEL INFO-CACHE</code>(&gt;= 3.2)返回主从服务器和从服务器的缓存信息输出。</p></li><li><p><code>SENTINEL IS-MASTER-DOWN-BY-ADDR</code>从当前SENTINEL的角度检查ip:port指定的master是否down。该命令主要用于内部使用。</p></li><li><p><code>SENTINEL MASTER &lt;master name&gt;</code>显示指定MASTER的状态和信息。</p></li><li><p><code>SENTINEL MASTERS</code>显示被监视的主机及其状态的列表。</p></li><li><p><code>SENTINEL MONITOR</code>启动SENTINEL监控。有关更多信息，请参阅运行时重新配置哨兵一节。</p></li><li><p><code>SENTINEL MYID</code>(&gt;= 6.2)返回SENTINEL实例的ID。</p></li><li><p><code>SENTINEL PENDING-SCRIPTS</code>该命令返回挂起脚本的信息。</p></li><li><p><code>SENTINEL REMOVE</code>停止哨兵的监控。有关更多信息，请参阅运行时重新配置哨兵一节。</p></li><li><p><code>SENTINEL REPLICAS &lt;master name&gt;</code>(&gt;= 5.0)显示该主机的从服务器列表及其状态。</p></li><li><p><code>SENTINEL SENTINELS &lt;master name&gt;</code>显示该主机的哨兵实例列表及其状态。</p></li><li><p><code>SENTINEL SET</code>设置SENTINEL的监控配置。有关更多信息，请参阅运行时重新配置哨兵一节。</p></li><li><p><code>SENTINEL SIMULATE-FAILURE (crash-after-election|crash-after-promotion|help)</code>(&gt;= 3.2)这个命令模拟不同的SENTINEL崩溃场景。</p></li><li><p><code>SENTINEL RESET &lt;pattern&gt;</code>该命令将重置所有具有匹配名称的master。pattern参数是一个全局样式的模式。重置过程清除主服务器中的任何先前状态(包括正在进行的故障转移)，并删除已发现并与主服务器关联的所有从服务器和哨兵。</p></li></ul><p>出于连接管理和管理的目的，Sentinel支持以下Redis命令的子集:</p><ul><li><p><code>ACL</code>(&gt;= 6.2)该命令用于管理哨兵访问控制列表。有关更多信息，请参阅ACL文档页面和哨兵访问控制列表身份验证。</p></li><li><p><code>AUTH</code>(&gt;= 5.0.1)验证客户端连接。有关更多信息，请参阅AUTH命令和配置带有身份验证的哨兵实例一节。</p></li><li><p><code>CLIENT</code>该命令管理客户端连接。有关更多信息，请参阅其子命令的页面。</p></li><li><p><code>COMMAND</code>(&gt;= 6.2)该命令返回命令的相关信息。有关更多信息，请参阅COMMAND命令及其各个子命令。</p></li><li><p><code>HELLO</code>(&gt;= 6.0)切换连接协议。更多信息请参见HELLO命令。</p></li><li><p><code>INFO</code>返回Sentinel服务器的信息和统计信息。有关更多信息，请参阅INFO命令。</p></li><li><p><code>PING</code>这个命令只是返回PONG。</p></li><li><p><code>ROLE</code>该命令返回字符串“sentinel”和被监控的主机列表。更多信息请参见ROLE命令。</p></li><li><p><code>SHUTDOWN</code>关闭Sentinel实例。</p></li></ul><p>最后，Sentinel还支持SUBSCRIBE、UNSUBSCRIBE、PSUBSCRIBE和PUNSUBSCRIBE命令。有关详细信息，请参阅Pub/Sub消息部分。</p><h4 id="在运行时重新配置sentinel" tabindex="-1">在运行时重新配置Sentinel <a class="header-anchor" href="#在运行时重新配置sentinel" aria-label="Permalink to &quot;在运行时重新配置Sentinel&quot;">​</a></h4><p>从Redis 2.8.4版本开始，Sentinel提供了一个API来添加、删除或更改给定主服务器的配置。注意，如果你有多个哨兵，你应该把这些变化应用到你的所有实例中，以便Redis哨兵正常工作。这意味着更改单个哨兵的配置不会自动将更改传播到网络中的其他哨兵。</p><p>下面是用于更新SENTINEL实例配置的SENTINEL子命令列表。</p><ul><li><p><code>SENTINEL MONITOR &lt;name&gt; &lt;ip&gt; &lt;port&gt; &lt;quorum&gt;</code>该命令告诉SENTINEL开始监视具有指定name、ip、port和quorum的新主机。它与sentinel.conf配置文件中的sentinel monitor配置指令相同，不同之处在于您不能在ip中使用主机名，但您需要提供IPv4或IPv6地址。</p></li><li><p><code>SENTINEL REMOVE &lt;name&gt;</code>用于删除指定的主机:该主机将不再被监视，并且将完全从SENTINEL的内部状态中删除，因此它将不再被SENTINEL主机列出，等等。</p></li><li><p><code>SENTINEL SET &lt;name&gt; [&lt;option&gt; &lt;value&gt; …]</code>SET命令与Redis的CONFIG SET命令非常相似，用于更改特定主机的配置参数。可以指定多个选项/值对(或者根本不指定)。可以通过sentinel.conf配置的所有配置参数也可以使用SET命令进行配置。</p></li></ul><p>下面是SENTINEL SET命令的示例，用于修改名为objects-cache的主服务器的down-after-milliseconds配置:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SENTINEL SET objects-cache-master down-after-milliseconds 1000</span></span></code></pre></div><p>如前所述，SENTINEL SET可用于设置启动配置文件中可设置的所有配置参数。此外，可以仅更改主仲裁配置，而无需使用SENTINEL REMOVE和SENTINEL MONITOR删除和重新添加主仲裁，只需使用:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>&gt; SENTINEL SET objects-cache-master quorum 5</span></span></code></pre></div><p>注意，没有等价的GET命令，因为SENTINEL MASTER以易于解析的格式(作为字段/值对数组)提供了所有配置参数。</p><p>从Redis 6.2版本开始，Sentinel还允许获取和设置全局配置参数，而在此之前，这些参数只能在配置文件中得到支持。</p><ul><li><p><code>SENTINEL CONFIG GET &lt;name&gt;</code>获取全局SENTINEL配置参数的当前值。指定的名称可以是通配符，类似于Redis CONFIG GET命令。</p></li><li><p><code>SENTINEL CONFIG SET &lt;name&gt; &lt;value&gt;</code>设置全局SENTINEL配置参数的值。</p></li></ul><p>可以操作的全局参数包括:</p><ul><li>resolve-hostnames, announce-hostnames。请参见IP地址和DNS名称。</li><li>announce-ip, announce-port。请参阅Sentinel、Docker、NAT和可能的问题。</li><li>sentinel-user, sentinel-pass。请参阅配置带有身份验证的哨兵实例。</li></ul><h4 id="增加或移除sentinel" tabindex="-1">增加或移除Sentinel <a class="header-anchor" href="#增加或移除sentinel" aria-label="Permalink to &quot;增加或移除Sentinel&quot;">​</a></h4><p>由于Sentinel实现了自动发现机制，因此向部署中添加新Sentinel是一个简单的过程。您所需要做的就是启动新的Sentinel，它被配置为监视当前活动的主机。在10秒内，哨兵将获得其他哨兵的名单和附在主人身上的从服务器。</p><p>如果你需要一次添加多个哨兵，建议一个接一个地添加，等待所有其他哨兵已经知道了第一个，然后再添加下一个。这对于保证只能在分区的一侧获得多数玩家是很有用的，因为在添加新哨兵的过程中可能会发生失败。</p><p>这可以通过在没有网络分区的情况下以30秒的延迟添加每个新的Sentinel来轻松实现。</p><p>在这个过程的最后，可以使用命令SENTINEL MASTER mastername来检查是否所有的哨兵都同意监视主的哨兵总数。</p><p>移除哨兵有点复杂:哨兵永远不会忘记已经看到的哨兵，即使它们很长一段时间无法访问，因为我们不想动态更改授权故障转移和创建新配置号所需的大多数。因此，为了删除Sentinel，应该在没有网络分区的情况下执行以下步骤:</p><ol><li>停止待移除的Sentinel的Sentinel进程。</li><li>发送一个SENTINEL RESET <em>命令到所有其他的SENTINEL实例(而不是</em>，你可以使用确切的主名称，如果你只想重置一个主)。一个接一个，实例之间至少等待30秒。</li><li>通过检查每个哨兵的SENTINEL MASTER mastername的输出，检查所有哨兵当前活动的哨兵数量是否一致。</li></ol><h4 id="移除旧的master或无法到达的从服务器" tabindex="-1">移除旧的master或无法到达的从服务器 <a class="header-anchor" href="#移除旧的master或无法到达的从服务器" aria-label="Permalink to &quot;移除旧的master或无法到达的从服务器&quot;">​</a></h4><p>哨兵永远不会忘记一个给定主人的复制品，即使他们很长一段时间都无法到达。这很有用，因为sentinel应该能够在网络分区或故障事件发生后正确地重新配置返回的从服务器。</p><p>此外，在故障转移之后，故障转移主服务器实际上是作为新主服务器的从服务器添加的，通过这种方式，它将被重新配置，以便在新主服务器再次可用时使用它进行复制。</p><p>然而，有时你想从哨兵监视的从服务器列表中永远删除从服务器(可能是旧master)。</p><p>为了做到这一点，你需要向所有哨兵发送一个SENTINEL RESET mastername命令:他们将在接下来的10秒内刷新从服务器列表，只添加那些从当前主INFO输出中正确复制的列表。</p><h4 id="从服务器优先级" tabindex="-1">从服务器优先级 <a class="header-anchor" href="#从服务器优先级" aria-label="Permalink to &quot;从服务器优先级&quot;">​</a></h4><p>Redis实例有一个名为replica-priority的配置参数。这些信息是由Redis从服务器实例在其INFO输出中暴露的，Sentinel使用它来从可以用于故障转移的从服务器中选择一个从服务器。</p><ol><li>如果将从服务器优先级设置为0，则该从服务器永远不会提升为master。</li><li>具有较低优先级号的从服务器被Sentinel优先选择。</li></ol><p>例如，如果在当前主服务器的同一数据中心有一个从服务器S1，在另一个数据中心有另一个从服务器S2，则可以将S1的优先级设置为10，将S2的优先级设置为100，这样，如果主服务器故障，并且S1和S2都可用，则优先选择S1。</p><p>有关选择副本方式的更多信息，请查看本文档的副本选择和优先级部分。</p><h3 id="sentinel实战" tabindex="-1">Sentinel实战 <a class="header-anchor" href="#sentinel实战" aria-label="Permalink to &quot;Sentinel实战&quot;">​</a></h3><h4 id="启动三台sentinel" tabindex="-1">启动三台Sentinel <a class="header-anchor" href="#启动三台sentinel" aria-label="Permalink to &quot;启动三台Sentinel&quot;">​</a></h4><p>sentinel.conf配置中，除了端口号分别是26379、26380和26381以外，其他内容都一样。具体如下：</p><ul><li>sentinel-26379.conf</li></ul><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Sentinel运行实例端口。</span></span>
<span class="line"><span>port 26379</span></span>
<span class="line"><span># 告诉Sentinel监视这个主机，并在O_DOWN中考虑它(客观上说)只有在至少达到法定人数时才处于哨兵同意状态。</span></span>
<span class="line"><span>sentinel monitor mymaster 127.0.0.1 6379 2</span></span>
<span class="line"><span># 主服务器(或任何附加的副本或哨兵)应该使用的毫秒数不可达(例如，不能接受PING的连续应答)(主观上)，以考虑其处于S_DOWN状态。</span></span>
<span class="line"><span>sentinel down-after-milliseconds mymaster 5000</span></span>
<span class="line"><span># 指定故障转移超时(以毫秒为单位)。</span></span>
<span class="line"><span>sentinel failover-timeout mymaster 60000</span></span>
<span class="line"><span># 我们可以重新配置多少个副本来同时指向新的副本在故障转移期间。如果使用副本提供查询，为了避免所有副本在同一时间无法访问与主服务器执行同步时的时间则使用较低的数字。</span></span>
<span class="line"><span>sentinel parallel-syncs mymaster 1</span></span></code></pre></div><ul><li>sentinel-26380.conf</li></ul><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Sentinel运行实例端口。</span></span>
<span class="line"><span>port 26380</span></span>
<span class="line"><span># 告诉Sentinel监视这个主机，并在O_DOWN中考虑它(客观上说)只有在至少达到法定人数时才处于哨兵同意状态。</span></span>
<span class="line"><span>sentinel monitor mymaster 127.0.0.1 6379 2</span></span>
<span class="line"><span># 主服务器(或任何附加的副本或哨兵)应该使用的毫秒数不可达(例如，不能接受PING的连续应答)(主观上)，以考虑其处于S_DOWN状态。</span></span>
<span class="line"><span>sentinel down-after-milliseconds mymaster 5000</span></span>
<span class="line"><span># 指定故障转移超时(以毫秒为单位)。</span></span>
<span class="line"><span>sentinel failover-timeout mymaster 60000</span></span>
<span class="line"><span># 我们可以重新配置多少个副本来同时指向新的副本在故障转移期间。如果使用副本提供查询，为了避免所有副本在同一时间无法访问与主服务器执行同步时的时间则使用较低的数字。</span></span>
<span class="line"><span>sentinel parallel-syncs mymaster 1</span></span></code></pre></div><ul><li>sentinel-26381.conf</li></ul><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Sentinel运行实例端口。</span></span>
<span class="line"><span>port 26381</span></span>
<span class="line"><span># 告诉Sentinel监视这个主机，并在O_DOWN中考虑它(客观上说)只有在至少达到法定人数时才处于哨兵同意状态。</span></span>
<span class="line"><span>sentinel monitor mymaster 127.0.0.1 6379 2</span></span>
<span class="line"><span># 主服务器(或任何附加的副本或哨兵)应该使用的毫秒数不可达(例如，不能接受PING的连续应答)(主观上)，以考虑其处于S_DOWN状态。</span></span>
<span class="line"><span>sentinel down-after-milliseconds mymaster 5000</span></span>
<span class="line"><span># 指定故障转移超时(以毫秒为单位)。</span></span>
<span class="line"><span>sentinel failover-timeout mymaster 60000</span></span>
<span class="line"><span># 我们可以重新配置多少个副本来同时指向新的副本在故障转移期间。如果使用副本提供查询，为了避免所有副本在同一时间无法访问与主服务器执行同步时的时间则使用较低的数字。</span></span>
<span class="line"><span>sentinel parallel-syncs mymaster 1</span></span></code></pre></div><p>启动命令分别如下：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel-26379.conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --sentinel</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1541:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:34:28.060</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # Sentinel ID is 10d649a97421cb46c749c4b58286c135882e173a</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1541:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:34:28.060</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # +monitor master mymaster 127.0.0.1 6379 quorum 2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1541:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:34:33.026</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # +sdown master mymaster 127.0.0.1 6379</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel-26380.conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --sentinel</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1542:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:42:45.016</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # Sentinel ID is a2b2b6b89975ed77be7eda6ad89e2a1da8057fda</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1542:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:42:45.020</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # +monitor master mymaster 127.0.0.1 6379 quorum 2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1542:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:42:49.946</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # +sdown master mymaster 127.0.0.1 6379</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sentinel-26381.conf</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --sentinel</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1543:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:42:57.801</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # Sentinel ID is 452d2e3f91b752592624e5ed1855b6d9e594ee43</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1543:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:42:57.813</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # +monitor master mymaster 127.0.0.1 6379 quorum 2</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">1543:X</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 26</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Aug</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 2023</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> 10:43:02.744</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> # +sdown master mymaster 127.0.0.1 6379</span></span></code></pre></div><p>由于还没有启动主服务器，所以可以看到三台Sentinel都认为此时主服务器是下线状态。</p><h4 id="启动主服务器和从服务器" tabindex="-1">启动主服务器和从服务器 <a class="header-anchor" href="#启动主服务器和从服务器" aria-label="Permalink to &quot;启动主服务器和从服务器&quot;">​</a></h4><p>启动命令分别如下：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server.exe</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server.exe</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6380</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --replicaof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127.0.0.1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> redis-server.exe</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --port</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --replicaof</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127.0.0.1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span></code></pre></div><p>主从服务器分别启动后，此时可以看到三台Sentinel的日志都显示检测到了主从服务器上线，内容如下：</p><div class="language-log vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">log</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1541</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 11:15:30.984</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # -sdown master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1541</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 11:16:31.120</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +slave slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6380</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6380</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1541</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 11:17:11.203</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +slave slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6381</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span></code></pre></div><h4 id="测试故障转移-1" tabindex="-1">测试故障转移 <a class="header-anchor" href="#测试故障转移-1" aria-label="Permalink to &quot;测试故障转移&quot;">​</a></h4><p>此时关闭主服务器，会发现Sentinel的日志出现以下内容：</p><ol><li>每个Sentinel检测到主服务器宕机并触发+sdown事件。</li><li>此事件随后升级为+odown，这意味着多个哨兵同意无法到达主节点的事实。</li><li>哨兵投票给哨兵，哨兵将开始第一次故障转移尝试。</li><li>发生故障转移。</li></ol><div class="language-log vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">log</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.700</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +sdown master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.760</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +odown master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> #quorum </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">/</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.762</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +new-epoch </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.763</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +try-failover master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.773</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +vote-for-leader </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a2b2b6b89975ed77be7eda6ad89e2a1da8057fda</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.797</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10d649a97421cb46c749c4b58286c135882e173a</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> voted for </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a2b2b6b89975ed77be7eda6ad89e2a1da8057fda</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.799</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">452d2e3f91b752592624e5ed1855b6d9e594ee43</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> voted for </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a2b2b6b89975ed77be7eda6ad89e2a1da8057fda</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 1</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.864</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +elected-leader master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.865</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +failover-state-select-slave master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.967</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +selected-slave slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6381</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:37.969</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +failover-state-send-slaveof-noone slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6381</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:38.071</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +failover-state-wait-promotion slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6381</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:38.833</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +promoted-slave slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6381</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:38.837</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +failover-state-reconf-slaves master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:38.905</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +slave-reconf-sent slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6380</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6380</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:39.864</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +slave-reconf-inprog slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6380</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6380</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:39.864</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +slave-reconf-done slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6380</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6380</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:39.933</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # -odown master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:39.933</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +failover-end master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:39.933</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +switch-master mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:39.934</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +slave slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6380</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6380</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:39.935</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * +slave slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:00:44.950</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # +sdown slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span></span></code></pre></div><p>可以看到6379主服务器下线后，三台Sentinel选举了6381作为新的主服务器，并将6379作为从服务器。</p><p>下面是6379重新上线后的Sentinel日志：</p><div class="language-log vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">log</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1542</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:X </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">26</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:07:11.139</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> # -sdown slave </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">6379</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6379</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> @ mymaster </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 6381</span></span></code></pre></div><h2 id="集群" tabindex="-1">集群 <a class="header-anchor" href="#集群" aria-label="Permalink to &quot;集群&quot;">​</a></h2><h3 id="redis集群tcp端口" tabindex="-1">Redis集群TCP端口 <a class="header-anchor" href="#redis集群tcp端口" aria-label="Permalink to &quot;Redis集群TCP端口&quot;">​</a></h3><p>每个Redis集群节点需要两个开放的TCP连接:一个Redis TCP端口用于服务客户端，例如6379，第二个端口称为集群总线端口。默认情况下，集群总线端口通过在数据端口上添加10000来设置(例如，16379);但是，您可以在集群端口配置中覆盖这一点。</p><h3 id="redis集群数据分片" tabindex="-1">Redis集群数据分片 <a class="header-anchor" href="#redis集群数据分片" aria-label="Permalink to &quot;Redis集群数据分片&quot;">​</a></h3><p>Redis集群不使用一致哈希，而是使用一种不同形式的分片，其中每个键在概念上都是我们称之为哈希槽的一部分。</p><p>Redis集群中有16384个哈希槽，为了计算给定键的哈希槽，我们只需将键的CRC16模取16384。</p><p>Redis集群中的每个节点负责哈希槽的一个子集，因此，例如，你可能有一个有3个节点的集群，其中:</p><ul><li>节点A包含0 ~ 5500个哈希槽。</li><li>节点B包含从5501到11000的哈希槽。</li><li>节点C包含从11001到16383的哈希槽。</li></ul><p>这使得添加和删除集群节点变得很容易。例如，如果我想添加一个新的节点D，我需要将节点a, B, C的一些哈希槽移动到D。类似地，如果我想从集群中删除节点a，我只需将a服务的哈希槽移动到B和C。一旦节点a为空，我可以将其完全从集群中删除。</p><p>将哈希槽从一个节点移动到另一个节点不需要停止任何操作;因此，添加和删除节点，或更改节点持有的哈希槽百分比，都不需要停机。</p><p>Redis Cluster支持多键操作，只要在单个命令执行(或整个事务，或Lua脚本执行)中涉及的所有键都属于相同的哈希槽。用户可以通过使用称为散列标签的功能强制多个密钥成为同一散列槽的一部分。</p><p>散列标签在Redis集群规范中被记录，但要点是，如果在关键字的{}括号之间有子字符串，则只有字符串内部的内容被散列。例如，密钥user:{123}:profile和user:{123}:account因为共享相同的哈希标签而保证在相同的哈希槽中。因此，您可以在同一个多键操作中操作这两个键。</p><h3 id="redis集群主-副本模型" tabindex="-1">Redis集群主-副本模型 <a class="header-anchor" href="#redis集群主-副本模型" aria-label="Permalink to &quot;Redis集群主-副本模型&quot;">​</a></h3><p>为了在主节点子集出现故障或无法与大多数节点通信时保持可用，Redis Cluster使用主-复制模型，其中每个哈希槽有从1(主节点本身)到N个副本(N-1个额外的副本节点)。</p><p>在我们的节点A、B、C的示例集群中，如果节点B失败，集群将无法继续，因为我们不再有办法为5501-11000范围内的哈希槽提供服务。</p><p>但是，当创建集群时(或稍后)，我们向每个主节点添加一个复制节点，这样最终的集群由主节点a、B、C和复制节点A1、B1、C1组成。这样，如果节点B出现故障，系统可以继续运行。</p><p>节点B1复制B，如果B失败，集群将提升节点B1为新的主节点，继续正常运行。</p><p>但是，请注意，如果节点B和节点B1同时故障，Redis Cluster将无法继续运行。</p><h3 id="redis集群一致性保证" tabindex="-1">Redis集群一致性保证 <a class="header-anchor" href="#redis集群一致性保证" aria-label="Permalink to &quot;Redis集群一致性保证&quot;">​</a></h3><p>Redis集群不保证强一致性。实际上，这意味着在某些情况下，Redis集群可能会丢失系统向客户端确认的写操作。</p><p>Redis集群丢失写的第一个原因是因为它使用异步复制。这意味着在写入过程中会发生以下事情:</p><ul><li>您的客户端写入主B。</li><li>主B向你的客户端回复OK。</li><li>主B将写操作传播到它的副本B1、B2和B3。</li></ul><p>正如你所看到的，B在回复客户端之前不会等待来自B1, B2, B3的确认，因为这对Redis来说是一个令人望而却步的延迟惩罚，所以如果你的客户端写了一些东西，B承认写，但在能够将写发送到副本之前崩溃，其中一个副本(没有收到写)可以提升为主，永远失去写。</p><p>这与配置为每秒将数据刷新到磁盘的大多数数据库所发生的情况非常相似，因此，由于过去使用不涉及分布式系统的传统数据库系统的经验，您已经能够推断出这种情况。类似地，您可以通过强制数据库在回复客户机之前将数据刷新到磁盘来提高一致性，但这通常会导致非常低的性能。这相当于Redis集群中的同步复制。</p><p>基本上，在性能和一致性之间需要做出权衡。</p><p>Redis集群在绝对需要的时候支持同步写，通过WAIT命令实现。这大大降低了写操作失败的可能性。但是，请注意，即使使用同步复制，Redis Cluster也不会实现强一致性:在更复杂的故障场景下，无法接收写操作的副本总是有可能被选为主副本。</p><p>还有一个值得注意的场景，Redis集群会丢失写，发生在网络分区期间，客户端与少数实例隔离，其中至少包括一个主节点。</p><p>以A、B、C、A1、B1、C1组成的6节点集群为例，集群中有3个主节点和3个副本。还有一个客户端，我们称之为Z1。</p><p>在分区发生后，可能在分区的一侧有A, C, A1, B1, C1，而在另一侧有B和Z1。</p><p>Z1仍然可以写入B, B会接受它的写入。如果分区在很短的时间内愈合，那么集群将继续正常运行。但是，如果分区持续的时间足够长，使得B1在分区的多数侧提升为master，则Z1在此期间发送给B的写操作将丢失。</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>对于Z1能够发送给B的写操作数量，存在一个最大窗口:如果分区的多数侧已经经过了足够的时间来选择一个副本作为主节点，那么少数侧的每个主节点都将停止接受写操作。</p></div><p>这个时间是Redis Cluster的一个非常重要的配置指令，被称为<strong>node timeout</strong>。</p><p>在节点超时之后，主节点被认为是失败的，并且可以由它的一个副本替换。类似地，在节点超时之后，如果没有一个主节点能够感知大多数其他主节点，它将进入错误状态并停止接受写操作。</p><h3 id="创建和使用一个redis集群" tabindex="-1">创建和使用一个Redis集群 <a class="header-anchor" href="#创建和使用一个redis集群" aria-label="Permalink to &quot;创建和使用一个Redis集群&quot;">​</a></h3><h4 id="创建redis集群的要求" tabindex="-1">创建Redis集群的要求 <a class="header-anchor" href="#创建redis集群的要求" aria-label="Permalink to &quot;创建Redis集群的要求&quot;">​</a></h4><p>要创建一个集群，你需要做的第一件事就是在集群模式下运行一些空的Redis实例。</p><p>至少，在redis.conf文件中设置以下指令:</p><div class="language-conf vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">conf</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># Redis运行实例端口。</span></span>
<span class="line"><span>port 7000</span></span>
<span class="line"><span># 正常的Redis实例不能成为Redis集群的一部分;只有节点启动集群节点可以。</span></span>
<span class="line"><span>cluster-enabled yes</span></span>
<span class="line"><span># 每个集群节点都有一个集群配置文件。这个文件不是打算手工编辑。它由Redis节点创建和更新。每个Redis集群节点需要一个不同的集群配置文件。</span></span>
<span class="line"><span>cluster-config-file nodes-7000.conf</span></span>
<span class="line"><span># 集群节点超时是节点不可达的毫秒数表示它被认为处于故障状态。大多数其他内部时间限制是节点超时的倍数。</span></span>
<span class="line"><span>cluster-node-timeout 5000</span></span>
<span class="line"><span># 开启AOF持久化功能</span></span>
<span class="line"><span>appendonly yes</span></span></code></pre></div><p>要启用集群模式，请将cluster-enabled指令设置为yes。每个实例还包含存储该节点配置的文件的路径，默认情况下是nodes.conf。这个文件从未被人类碰过;它只是由Redis集群实例在启动时生成，并在每次需要时更新。</p><p>注意，按预期工作的最小集群必须包含至少三个主节点。对于部署，我们强烈建议使用六个节点的集群，其中包含三个主节点和三个副本。</p><p>您可以在本地测试这一点，方法是以您将在任何给定目录中运行的实例的端口号来创建以下目录。例如：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster-test</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> cluster-test</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7000</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7001</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7002</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7003</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7004</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7005</span></span></code></pre></div><p>在从7000到7005的每个目录中创建一个redis.conf文件。只需使用上面的小示例作为配置文件的模板，但要确保根据目录名将端口号7000替换为正确的端口号。</p><p>你可以像下面这样启动每个实例，每个实例运行在一个单独的终端选项卡中:</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">cd</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 7000</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">redis-server</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ./redis.conf</span></span></code></pre></div><p>您将从日志中看到，每个节点为自己分配了一个新ID:</p><div class="language-log vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">log</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">889</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:M </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">28</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> Aug </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">2023</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> 12:02:26.699</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> * No cluster configuration found, I&#39;m </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">872fc625a3728afdb42d67abf7137f5df572fdf8</span></span></code></pre></div><p>此ID将由该特定实例永久使用，以便实例在集群上下文中具有唯一的名称。每个节点都使用这些id来记住其他节点，而不是通过IP或端口。IP地址和端口可能会改变，但唯一的节点标识符在节点的整个生命周期内永远不会改变。我们将此标识符简称为节点ID。</p><h4 id="创建redis集群" tabindex="-1">创建Redis集群 <a class="header-anchor" href="#创建redis集群" aria-label="Permalink to &quot;创建Redis集群&quot;">​</a></h4><p>现在我们已经运行了许多实例，您需要通过向节点写入一些有意义的配置来创建集群。</p><p>您可以手动配置和执行单个实例，也可以使用create-cluster脚本。让我们来看看如何手动操作。</p><p>创建集群，使用命令:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>redis-cli --cluster create 127.0.0.1:7000 127.0.0.1:7001 \\</span></span>
<span class="line"><span>127.0.0.1:7002 127.0.0.1:7003 127.0.0.1:7004 127.0.0.1:7005 \\</span></span>
<span class="line"><span>--cluster-replicas 1</span></span></code></pre></div><p>这里使用的命令是create，因为我们想要创建一个新的集群。选项——cluster-replicas 1表示我们希望为每个创建的主节点创建一个副本。</p><p>其他参数是我想用来创建新集群的实例的地址列表。</p><p>redis-cli将提出一个配置。输入yes接受建议的配置。集群将被配置和加入，这意味着实例将被引导成相互通信。最后，如果一切正常，您将看到这样的消息:</p><div class="language-log vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">log</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;&gt; Nodes configuration updated</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;&gt; Assign a different config epoch to each node</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;&gt; Sending CLUSTER MEET messages to join the cluster</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">Waiting for the cluster to join</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;&gt; Performing Cluster Check (using node </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7000</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">M: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">55b5059cb680686c924a6b5792c9c7bdf35bf4ac</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7000</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   slots:[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">-</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5460</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5461</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slots) master</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> additional replica(s)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">S: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">a30922d69d1537994ca0658e4d13250ea324d816</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7003</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   slots: (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slots) slave</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   replicates </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">55b5059cb680686c924a6b5792c9c7bdf35bf4ac</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">M: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">54c088d731422ab730ffc1d65c5c396163f32e05</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7001</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   slots:[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5461-10922</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5462</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slots) master</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> additional replica(s)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">M: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">c639a26858ab99d5356e70aef7d951147e0f2f14</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7002</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   slots:[</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">10923-16383</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">] (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">5461</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slots) master</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">   1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> additional replica(s)</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">S: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">b1aa690b03b8da3aedeea6ded5135e5161b6f4b8</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7005</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   slots: (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slots) slave</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   replicates </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">c639a26858ab99d5356e70aef7d951147e0f2f14</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">S: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">88aa5c76702e7e32f1b466f48d02d797e58af3d8</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 127</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">.</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">1</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">7004</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   slots: (</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">0</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slots) slave</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">   replicates </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">54c088d731422ab730ffc1d65c5c396163f32e05</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[OK] All nodes agree about slots configuration.</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;&gt; Check for open slots...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">&gt;&gt;&gt; Check slots coverage...</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">[OK] All </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">16384</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> slots covered.</span></span></code></pre></div><p>这意味着至少有一个主实例为16384个可用插槽中的每个插槽提供服务。</p><h4 id="与集群交互" tabindex="-1">与集群交互 <a class="header-anchor" href="#与集群交互" aria-label="Permalink to &quot;与集群交互&quot;">​</a></h4><p>要连接到Redis Cluster，你需要一个集群感知的Redis客户端。请参阅所选客户机的文档，以确定其集群支持。</p><p>你也可以使用redis-cli命令行工具来测试你的Redis集群:</p><div class="language-redis vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">redis</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>$ redis-cli -c -p 7000</span></span>
<span class="line"><span>127.0.0.1:7000&gt; SET mykey hello</span></span>
<span class="line"><span>-&gt; Redirected to slot [14687] located at 127.0.0.1:7002</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:7002&gt; SET mykey1 world</span></span>
<span class="line"><span>-&gt; Redirected to slot [1860] located at 127.0.0.1:7000</span></span>
<span class="line"><span>OK</span></span>
<span class="line"><span>127.0.0.1:7000&gt; GET mykey</span></span>
<span class="line"><span>-&gt; Redirected to slot [14687] located at 127.0.0.1:7002</span></span>
<span class="line"><span>&quot;hello&quot;</span></span>
<span class="line"><span>127.0.0.1:7002&gt; GET mykey1</span></span>
<span class="line"><span>-&gt; Redirected to slot [1860] located at 127.0.0.1:7000</span></span>
<span class="line"><span>&quot;world&quot;</span></span></code></pre></div><p>redis-cli集群支持是非常基本的，所以它总是使用Redis集群节点能够将客户端重定向到正确的节点这一事实。一个严肃的客户端能够做得更好，并缓存散列槽和节点地址之间的映射，以便直接使用到正确节点的正确连接。映射仅在集群配置发生更改时才刷新，例如在故障转移之后，或者在系统管理员通过添加或删除节点更改集群布局之后。</p>`,1249)]))}const k=a(e,[["render",l]]);export{u as __pageData,k as default};
