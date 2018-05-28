Vue.component("addStopWatch", {

template:'

<div id="section" class="text-center">
    <h1><time>00:00:00</time></h1>
<button id="start" class="btn btn-outline-success">start</button>
<button id="stop" class="btn btn-outline-primary">stop</button>
<a id="clear" href="#myModal" class="btn btn-outline-danger" data-toggle="modal" data-target="#myModal">clear</a>
<h1 class="title">Tytul zadania</h1>
</div>',



});

new Vue({
el:"#app",
data: {


},


});