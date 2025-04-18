import{_ as o,c as e,o as t,ag as r}from"./chunks/framework.BPIbAgMo.js";const h=JSON.parse('{"title":"Spring 事务传播行为","description":"","frontmatter":{"title":"Spring 事务传播行为","permalink":"1591863286.html","sidebar":"auto","blogs":"Spring","date":"2020-06-11"},"headers":[],"relativePath":"category/spring/Spring 事务传播行为.md","filePath":"category/spring/Spring 事务传播行为.md","lastUpdated":1714213745000}'),n={name:"category/spring/Spring 事务传播行为.md"};function c(i,a,l,d,s,p){return t(),e("div",null,a[0]||(a[0]=[r('<h1 id="spring-事务传播行为" tabindex="-1">Spring 事务传播行为 <a class="header-anchor" href="#spring-事务传播行为" aria-label="Permalink to &quot;Spring 事务传播行为&quot;">​</a></h1><p><code>Propagation</code>枚举，该枚举表示与<code>@Transactional</code>事务注解一起使用的事务传播行为，对应于<code>TransactionDefinition</code>接口。</p><h2 id="required" tabindex="-1">REQUIRED <a class="header-anchor" href="#required" aria-label="Permalink to &quot;REQUIRED&quot;">​</a></h2><p>支持当前事务，如果不存在则创建一个新事务。这是<code>@Transactional</code>事务注解的默认设置。</p><p>假设Service A中的a方法调用Service B中的b方法，这里分为两种情况：</p><h3 id="a方法有-transactional事务注解" tabindex="-1">a方法有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法有-transactional事务注解" aria-label="Permalink to &quot;a方法有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.REQUIRED</code>，结果如下：</p><ul><li><p>b加入a的事务</p></li><li><p>无论哪个方法抛出异常，a和b都会回滚</p></li><li><p>不能捕获b抛出的异常，否则出现<code>org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only</code>。除非在<code>catch</code>中加上<code>TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();</code>，但a和b仍然都会回滚</p></li></ul><h3 id="a方法没有-transactional事务注解" tabindex="-1">a方法没有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法没有-transactional事务注解" aria-label="Permalink to &quot;a方法没有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.REQUIRED</code>，结果如下：</p><ul><li>b创建一个新事务</li></ul><h2 id="supports" tabindex="-1">SUPPORTS <a class="header-anchor" href="#supports" aria-label="Permalink to &quot;SUPPORTS&quot;">​</a></h2><p>支持当前事务，如果不存在则以非事务方式执行。</p><p>假设Service A中的a方法调用Service B中的b方法，这里分为两种情况：</p><h3 id="a方法有-transactional事务注解-1" tabindex="-1">a方法有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法有-transactional事务注解-1" aria-label="Permalink to &quot;a方法有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.SUPPORTS</code>，结果如下：</p><ul><li><p>b加入a的事务</p></li><li><p>无论哪个方法抛出异常，a和b都会回滚</p></li><li><p>不能捕获b抛出的异常，否则出现<code>org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only</code>。除非在<code>catch</code>中加上<code>TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();</code>，但a和b仍然都会回滚</p></li></ul><h3 id="a方法没有-transactional事务注解-1" tabindex="-1">a方法没有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法没有-transactional事务注解-1" aria-label="Permalink to &quot;a方法没有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.SUPPORTS</code>，结果如下：</p><ul><li>b以非事务方式执行</li></ul><h2 id="mandatory" tabindex="-1">MANDATORY <a class="header-anchor" href="#mandatory" aria-label="Permalink to &quot;MANDATORY&quot;">​</a></h2><p>支持当前事务，如果不存在则抛出异常。</p><p>假设Service A中的a方法调用Service B中的b方法，这里分为两种情况：</p><h3 id="a方法有-transactional事务注解-2" tabindex="-1">a方法有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法有-transactional事务注解-2" aria-label="Permalink to &quot;a方法有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.MANDATORY</code>，结果如下：</p><ul><li><p>b加入a的事务</p></li><li><p>无论哪个方法抛出异常，a和b都会回滚</p></li><li><p>不能捕获b抛出的异常，否则出现<code>org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only</code>。除非在<code>catch</code>中加上<code>TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();</code>，但a和b仍然都会回滚</p></li></ul><h3 id="a方法没有-transactional事务注解-2" tabindex="-1">a方法没有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法没有-transactional事务注解-2" aria-label="Permalink to &quot;a方法没有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.MANDATORY</code>，结果如下：</p><ul><li>在调用b时会出现<code>org.springframework.transaction.IllegalTransactionStateException: No existing transaction found for transaction marked with propagation &#39;mandatory&#39;</code></li></ul><h2 id="requires-new" tabindex="-1">REQUIRES_NEW <a class="header-anchor" href="#requires-new" aria-label="Permalink to &quot;REQUIRES_NEW&quot;">​</a></h2><p>创建一个新事务，如果存在当前事务，则挂起当前事务。</p><p>假设Service A中的a方法调用Service B中的b方法，这里分为两种情况：</p><h3 id="a方法有-transactional事务注解-3" tabindex="-1">a方法有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法有-transactional事务注解-3" aria-label="Permalink to &quot;a方法有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.REQUIRES_NEW</code>，结果如下：</p><ul><li><p>b创建一个新事务，a抛出的异常不会导致b回滚</p></li><li><p>b抛出的异常会导致a回滚，可以捕获b抛出的异常来避免a回滚</p></li></ul><h3 id="a方法没有-transactional事务注解-3" tabindex="-1">a方法没有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法没有-transactional事务注解-3" aria-label="Permalink to &quot;a方法没有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.REQUIRES_NEW</code>，结果如下：</p><ul><li>b创建一个新事务</li></ul><h2 id="not-supported" tabindex="-1">NOT_SUPPORTED <a class="header-anchor" href="#not-supported" aria-label="Permalink to &quot;NOT_SUPPORTED&quot;">​</a></h2><p>以非事务方式执行，如果存在当前事务，则暂停当前事务。</p><p>假设Service A中的a方法调用Service B中的b方法，这里分为两种情况：</p><h3 id="a方法有-transactional事务注解-4" tabindex="-1">a方法有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法有-transactional事务注解-4" aria-label="Permalink to &quot;a方法有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.NOT_SUPPORTED</code>，结果如下：</p><ul><li><p>b以非事务方式执行</p></li><li><p>b抛出的异常会导致a回滚，可以捕获b抛出的异常来避免a回滚</p></li></ul><h3 id="a方法没有-transactional事务注解-4" tabindex="-1">a方法没有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法没有-transactional事务注解-4" aria-label="Permalink to &quot;a方法没有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.NOT_SUPPORTED</code>，结果如下：</p><ul><li>b以非事务方式执行</li></ul><h2 id="never" tabindex="-1">NEVER <a class="header-anchor" href="#never" aria-label="Permalink to &quot;NEVER&quot;">​</a></h2><p>以非事务方式执行，如果存在事务则抛出异常。</p><p>假设Service A中的a方法调用Service B中的b方法，这里分为两种情况：</p><h3 id="a方法有-transactional事务注解-5" tabindex="-1">a方法有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法有-transactional事务注解-5" aria-label="Permalink to &quot;a方法有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.NEVER</code>，结果如下：</p><ul><li><p>在调用b时会出现<code>org.springframework.transaction.IllegalTransactionStateException: Existing transaction found for transaction marked with propagation &#39;never&#39;</code></p></li><li><p>b抛出的异常会导致a回滚，可以捕获b抛出的异常来避免a回滚</p></li></ul><h3 id="a方法没有-transactional事务注解-5" tabindex="-1">a方法没有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法没有-transactional事务注解-5" aria-label="Permalink to &quot;a方法没有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.NEVER</code>，结果如下：</p><ul><li>b以非事务方式执行</li></ul><h2 id="nested" tabindex="-1">NESTED <a class="header-anchor" href="#nested" aria-label="Permalink to &quot;NESTED&quot;">​</a></h2><p>如果当前事务存在，则在嵌套事务中执行，否则表现为<code>REQUIRED</code>。</p><p>假设Service A中的a方法调用Service B中的b方法，这里分为两种情况：</p><h3 id="a方法有-transactional事务注解-6" tabindex="-1">a方法有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法有-transactional事务注解-6" aria-label="Permalink to &quot;a方法有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.NESTED</code>，结果如下：</p><ul><li><p>b在嵌套事务中执行</p></li><li><p>无论哪个方法抛出异常，a和b都会回滚</p></li><li><p>可以捕获b的异常来避免a回滚</p></li></ul><h3 id="a方法没有-transactional事务注解-6" tabindex="-1">a方法没有<code>@Transactional</code>事务注解 <a class="header-anchor" href="#a方法没有-transactional事务注解-6" aria-label="Permalink to &quot;a方法没有`@Transactional`事务注解&quot;">​</a></h3><p>如果b方法有<code>Propagation.NESTED</code>，结果如下：</p><ul><li>b创建一个新事务，以<code>Propagation.REQUIRED</code>传播行为执行</li></ul><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><table tabindex="0"><thead><tr><th>a调用b</th><th>a有事务且是默认传播行为</th><th>a没有事务</th></tr></thead><tbody><tr><td>b事务传播行为是<code>REQUIRED</code></td><td><strong>默认传播行为</strong>。b加入a的事务。无论哪个方法抛出异常，a和b都会回滚。不能捕获b抛出的异常，否则出现<code>org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only</code>；除非在<code>catch</code>中加上<code>TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();</code>，但a和b仍然都会回滚</td><td>b创建一个新事务</td></tr><tr><td>b事务传播行为是<code>SUPPORTS</code></td><td>b加入a的事务。无论哪个方法抛出异常，a和b都会回滚。不能捕获b抛出的异常，否则出现<code>org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only</code>；除非在<code>catch</code>中加上<code>TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();</code>，但a和b仍然都会回滚</td><td>b以非事务方式执行</td></tr><tr><td>b事务传播行为是<code>MANDATORY</code></td><td>b加入a的事务。无论哪个方法抛出异常，a和b都会回滚。不能捕获b抛出的异常，否则出现<code>org.springframework.transaction.UnexpectedRollbackException: Transaction rolled back because it has been marked as rollback-only</code>；除非在<code>catch</code>中加上<code>TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();</code>，但a和b仍然都会回滚</td><td>在调用b时会出现<code>org.springframework.transaction.IllegalTransactionStateException: No existing transaction found for transaction marked with propagation &#39;mandatory&#39;</code></td></tr><tr><td>b事务传播行为是<code>REQUIRES_NEW</code></td><td>b创建一个新事务，a抛出的异常不会导致b回滚。b抛出的异常会导致a回滚，可以捕获b抛出的异常来避免a回滚</td><td>b创建一个新事务</td></tr><tr><td>b事务传播行为是<code>NOT_SUPPORTED</code></td><td>b以非事务方式执行。b抛出的异常会导致a回滚，可以捕获b抛出的异常来避免a回滚</td><td>b以非事务方式执行</td></tr><tr><td>b事务传播行为是<code>NEVER</code></td><td>在调用b时会出现<code>org.springframework.transaction.IllegalTransactionStateException: Existing transaction found for transaction marked with propagation &#39;never&#39;</code>。b抛出的异常会导致a回滚，可以捕获b抛出的异常来避免a回滚</td><td>b以非事务方式执行</td></tr><tr><td>b事务传播行为是<code>NESTED</code></td><td>b在嵌套事务中执行。无论哪个方法抛出异常，a和b都会回滚。可以捕获b抛出的异常来避免a回滚</td><td>b创建一个新事务，以<code>Propagation.REQUIRED</code>传播行为执行</td></tr></tbody></table>',67)]))}const u=o(n,[["render",c]]);export{h as __pageData,u as default};
