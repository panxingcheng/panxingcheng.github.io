import{_ as i,c as a,o as n,ag as l}from"./chunks/framework.BPIbAgMo.js";const c=JSON.parse('{"title":"Docker 安装","description":"","frontmatter":{"title":"Docker 安装","permalink":"1630720410.html","sidebar":"auto","blogs":"Docker","date":"2021-09-04"},"headers":[],"relativePath":"category/docker/Docker 安装.md","filePath":"category/docker/Docker 安装.md","lastUpdated":1714213745000}'),e={name:"category/docker/Docker 安装.md"};function h(t,s,p,k,d,F){return n(),a("div",null,s[0]||(s[0]=[l(`<h1 id="docker-安装" tabindex="-1">Docker 安装 <a class="header-anchor" href="#docker-安装" aria-label="Permalink to &quot;Docker 安装&quot;">​</a></h1><h2 id="ubuntu-安装-docker" tabindex="-1">Ubuntu 安装 Docker <a class="header-anchor" href="#ubuntu-安装-docker" aria-label="Permalink to &quot;Ubuntu 安装 Docker&quot;">​</a></h2><h3 id="主机版本" tabindex="-1">主机版本 <a class="header-anchor" href="#主机版本" aria-label="Permalink to &quot;主机版本&quot;">​</a></h3><p>本次安装使用的 Ubuntu 版本为：Ubuntu 20.04 LTS</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> lsb_release</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -a</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">No</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> LSB</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> modules</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> are</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> available.</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Distributor</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ID:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Ubuntu</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Description:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    Ubuntu</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 20.04</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> LTS</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Release:</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">        20.04</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Codename:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">       focal</span></span></code></pre></div><h3 id="卸载旧版本-docker" tabindex="-1">卸载旧版本 Docker <a class="header-anchor" href="#卸载旧版本-docker" aria-label="Permalink to &quot;卸载旧版本 Docker&quot;">​</a></h3><p>Docker 的旧版本被称为 docker、docker.io 或者 docker-engine。如果安装了这些，卸载它们：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> remove</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-engine</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker.io</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> runc</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">提示</p><p>这会保留 <em>/var/lib/docker/</em> 文件中的镜像、容器、卷、网络等内容。如果您不需要保存现有数据，并且希望开始一次干净的安装，请参阅本页底部的 <a href="#卸载-docker-Engine">卸载 Docker Engine</a> 一节。</p></div><h3 id="从-docker-存储库安装" tabindex="-1">从 Docker 存储库安装 <a class="header-anchor" href="#从-docker-存储库安装" aria-label="Permalink to &quot;从 Docker 存储库安装&quot;">​</a></h3><p>大多数用户设置 Docker 的存储库并从中安装，以方便安装和升级任务。这是推荐的方法。</p><p>在新主机上首次安装 Docker Engine 之前，需要先设置 Docker 存储库。之后，您可以从存储库安装和更新 Docker。</p><h4 id="设置-docker-存储库" tabindex="-1">设置 Docker 存储库 <a class="header-anchor" href="#设置-docker-存储库" aria-label="Permalink to &quot;设置 Docker 存储库&quot;">​</a></h4><ol><li><p>更新 <code>apt</code> 包索引和安装包，以允许 <code>apt</code> 使用 HTTPS 存储库：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    ca-certificates</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    curl</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    gnupg</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    lsb-release</span></span></code></pre></div></li><li><p>添加 Docker 的官方 <code>GPG</code> 密钥：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> mkdir</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -m</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> 0755</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -p</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/apt/keyrings</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span></span></code></pre></div></li><li><p>使用以下命令设置 <code>stable</code> 版本的存储库：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> echo</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> \\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;deb [arch=$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">dpkg</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> --print-architecture</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\\</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">$(</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">lsb_release</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -cs</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">) stable&quot;</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> tee</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /etc/apt/sources.list.d/docker.list</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> &gt;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /dev/null</span></span></code></pre></div></li></ol><h4 id="安装-docker-engine" tabindex="-1">安装 Docker Engine <a class="header-anchor" href="#安装-docker-engine" aria-label="Permalink to &quot;安装 Docker Engine&quot;">​</a></h4><ol><li><p>更新 <code>apt</code> 包索引，安装最新版本的 Docker Engine 和 container：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> update</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.io</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-buildx-plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose-plugin</span></span></code></pre></div><div class="tip custom-block"><p class="custom-block-title">安装特定版本的 Docker Engine 和 container</p><p>要安装特定版本的 Docker Engine，请在 repo 中列出可用的版本，然后选择并安装：</p><ol><li><p>列出您的 repo 中可用的版本：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-cache</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> madison</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce</span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;"> |</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> awk</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;{ print $3 }&#39;</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:23.0.1-1~ubuntu.20.04~focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:23.0.0-1~ubuntu.20.04~focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.23~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.22~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.21~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.20~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.19~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.18~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.17~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.16~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.15~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.14~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.13~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.12~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.11~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.10~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.9~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.8~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.7~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.6~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.5~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.4~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.3~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.2~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.1~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:20.10.0~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:19.03.15~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:19.03.14~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:19.03.13~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:19.03.12~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:19.03.11~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:19.03.10~3-0~ubuntu-focal</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">5:19.03.9~3-0~ubuntu-focal</span></span></code></pre></div></li><li><p>选择所需的版本并安装：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> VERSION_STRING=5:20.10.13~3-0~ubuntu-jammy</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt-get</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> install</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$VERSION_STRING </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">docker-ce-cli=</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">$VERSION_STRING </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">containerd.io</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-buildx-plugin</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-compose-plugin</span></span></code></pre></div></li></ol></div></li><li><p>通过运行hello-world镜像来验证Docker引擎是否正确安装：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello-world</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Unable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> find</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> &#39;hello-world:latest&#39;</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> locally</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">latest:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Pulling</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> library/hello-world</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">b8dfde127a29:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Pull</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> complete</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Digest:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sha256:7d91b69e04a9029b99f3585aaaccae2baa80bcf318f4a5d2165a9898cd2dc0a1</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Status:</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Downloaded</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> newer</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> image</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> for</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello-world:latest</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">Hello</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> from</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> Docker!</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">This</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> message</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> shows</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> that</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> your</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> installation</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> appears</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> to</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> be</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> working</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> correctly.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">...</span></span></code></pre></div><p>这个命令下载一个测试镜像并在容器中运行它。当容器运行时，它打印一条消息并退出。</p></li></ol><div class="tip custom-block"><p class="custom-block-title">提示</p><p>已安装并运行 Docker 引擎。docker 组已创建，但未添加任何用户。您需要使用 <code>sudo</code> 来运行 Docker 命令。</p></div><h3 id="卸载-docker-engine" tabindex="-1">卸载 Docker Engine <a class="header-anchor" href="#卸载-docker-engine" aria-label="Permalink to &quot;卸载 Docker Engine&quot;">​</a></h3><ol><li><p>卸载 Docker Engine、CLI 和 Containerd 包：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> apt</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> purge</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker-ce-cli</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.io</span></span></code></pre></div></li><li><p>主机上的镜像、容器、卷或自定义配置文件不会自动删除。要删除所有镜像、容器和卷：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -rf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/docker</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> rm</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -rf</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> /var/lib/containerd</span></span></code></pre></div></li></ol><h2 id="docker-在-linux-下安装后设置" tabindex="-1">Docker 在 Linux 下安装后设置 <a class="header-anchor" href="#docker-在-linux-下安装后设置" aria-label="Permalink to &quot;Docker 在 Linux 下安装后设置&quot;">​</a></h2><h3 id="以非-root-用户管理-docker" tabindex="-1">以非 root 用户管理 Docker <a class="header-anchor" href="#以非-root-用户管理-docker" aria-label="Permalink to &quot;以非 root 用户管理 Docker&quot;">​</a></h3><p>Docker 守护进程绑定到 Unix 套接字而不是 TCP 端口。默认情况下，Unix 套接字属于 <code>root</code> 用户，其他用户只能使用 <code>sudo</code> 访问它。Docker 守护进程始终以 <code>root</code> 用户运行。</p><p>如果您不想在 docker 命令之前加上 <code>sudo</code>，可以创建一个名为 <code>docker</code> 的 Unix 组并向其中添加用户。当 Docker 守护进程启动时，它会创建一个由 Docker 组的成员访问的 Unix 套接字。</p><p>创建 <code>docker</code> 组并添加当前用户：</p><ol><li><p>创建 <code>docker</code> 组。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> groupadd</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span></code></pre></div></li><li><p>添加当前用户到 <code>docker</code> 组。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> usermod</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -aG</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> $USER</span></span></code></pre></div></li><li><p>激活对 <code>docker</code> 组的修改。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> newgrp</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span></span></code></pre></div></li><li><p>验证当前用户可以在不使用 <code>sudo</code> 的情况下运行 docker 命令。</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> run</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> hello-world</span></span></code></pre></div></li></ol><h3 id="将-docker-设置为开机自启动" tabindex="-1">将 Docker 设置为开机自启动 <a class="header-anchor" href="#将-docker-设置为开机自启动" aria-label="Permalink to &quot;将 Docker 设置为开机自启动&quot;">​</a></h3><p>要设置开机自动启动 Docker 和 Containerd，请使用下面的命令：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker.service</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> enable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.service</span></span></code></pre></div><p>要禁用此行为，请使用 <code>disable</code>：</p><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> disable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> docker.service</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">$</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> sudo</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> systemctl</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> disable</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> containerd.service</span></span></code></pre></div>`,30)]))}const o=i(e,[["render",h]]);export{c as __pageData,o as default};
