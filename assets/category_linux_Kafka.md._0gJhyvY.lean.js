import{_ as t,c as f,j as a,a as k,o}from"./chunks/framework.B88TJiW2.js";const c=JSON.parse('{"title":"Kafka","description":"","frontmatter":{"title":"Kafka","permalink":"1602941123.html","sidebar":"auto","blogs":"Linux","date":"2020-10-17"},"headers":[],"relativePath":"category/linux/Kafka.md","filePath":"category/linux/Kafka.md"}'),r={name:"category/linux/Kafka.md"};function n(l,e,K,i,s,d){return o(),f("div",null,e[0]||(e[0]=[a("h1",{id:"kafka",tabindex:"-1"},[k("Kafka "),a("a",{class:"header-anchor",href:"#kafka","aria-label":'Permalink to "Kafka"'},"​")],-1),a("p",null,"Kafka 最初是 LinkedIn 的一个内部基础设施系统。可以认为 Kafka 是一个流平台：在这个平台上可以发布和订阅数据流，并把它们保存起来、进行处理。",-1),a("p",null,"Kafka 有点像消息系统，允许发布和订阅消息流。从这点来看，它类似于 ActiveMQ、RabbitMQ 或 IBM 的 MQSeries 等产品。但 Kafka 与这些传统的消息系统仍然存在很多重要的不同点：首先，作为一个现代的分布式系统，Kafka 以集群的方式运行，可以自由伸缩，处理公司的所有应用程序。Kafka 集群并不是一组独立运行的 broker，而是一个可以灵活伸缩的中心平台，可以处理整个公司所有的数据流。其次，Kafka 可以按照你的要求存储数据，保存多久都可以。作为数据连接层，Kafka 提供了数据传递保证——可复制、持久化，保留多长时间完全可以由你来决定。最后，流式处理将数据处理的层次提升到了新高度。消息系统只会传递消息，而 Kafka 的流式处理能力让你只用很少的代码就能够动态地处理派生流和数据集。",-1),a("p",null,"从另一个角度可以把 Kafka 看成实时版的 Hadoop。Hadoop 可以存储和定期处理大量的数据文件，而 Kafka 可以存储和持续处理大型的数据流。它们之间的最大不同体现在持续的低延迟处理和批处理之间的差异上。Hadoop 和大数据主要应用在数据分析上，而 Kafka 因其低延迟的特点更适合用在核心的业务应用上。业务事件时刻在发生，Kafka 能够及时对这些事件作出响应，基于 Kafka 构建的服务直接为业务运营提供支撑，提升用户体验。",-1),a("p",null,"Kafka 与 ETL 工具或其他数据集成工具之间也可以进行一番比较。Kafka 和这些工具都擅长移动数据，但它们最大的不同在于 Kafka 颠覆了传统的思维。Kafka 并非只是把数据从一个系统拆解出来再塞进另一个系统，它其实是一个面向实时数据流的平台。也就是说，它不仅可以将现有的应用程序和数据系统连接起来，它还能用于加强这些触发相同数据流的应用。在某种程度上说，这些数据流是现代数字科技公司的核心，与他们的现金流一样重要。",-1),a("p",null,"将上述的三个领域聚合在一起，将所有的数据流整合到一起，流平台因此变得极具吸引力。",-1)]))}const u=t(r,[["render",n]]);export{c as __pageData,u as default};