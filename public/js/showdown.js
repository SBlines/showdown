//level/# of wins will affect the enemy image, background, timing.
//maybe stick all stats in a hash: {level 1: background-grass, enemy-guy1, delay-1000ms}
//266 best delay
//http://www.wavsource.com/
//http://www.soundjay.com/
//heroku push master from site folder
//http://pacific-beyond-2355.herokuapp.com/




//turn off spacebar click when early, lose, or win is ran. turn back on during run()
//$('body').unbind();
//change to on in order to on/off keypress
//turn back on upon clicking ready




var player = {ready:'/media/pReady.png', comm:'/media/pComm.png', lose:'/media/pDown.png'};
var opponents = [
{ready:'/media/eReady.png', comm:'/media/eComm.png', lose:'/media/eDown.png', delay: 9000},
{ready:'/media/eReady.png', comm:'/media/eComm.png', lose:'/media/eDown.png', delay: 2200},
{ready:'/media/eReady2.png', comm:'/media/eComm2.png', lose:'/media/eDown2.png', delay: 1000},
{ready:'/media/eReady3.png', comm:'/media/eComm3.png', lose:'/media/eDown3.png', delay: 900},
{ready:'/media/eReady4.png', comm:'/media/eComm4.png', lose:'/media/eDown4.png', delay: 700},
{ready:'/media/eReady.png', comm:'/media/eComm.png', lose:'/media/eDown.png', delay: 440},
{ready:'/media/eReady.png', comm:'/media/eComm.png', lose:'/media/eDown.png', delay: 350},
{ready:'/media/eReady.png', comm:'/media/eComm.png', lose:'/media/eDown.png', delay: 300},
{ready:'/media/eReady.png', comm:'/media/eComm.png', lose:'/media/eDown.png', delay: 271}
]

var early;
var drawTime = 0;
var playerDraw = 0;
var level = 1;
var drawID;


document.getElementById('lev').innerHTML=level;
$('#player').css('content', 'url("' + player.ready + '")');



 
ready = function(){
	//drawID added for clearTimeout upon drawing early
	drawID =setTimeout(function(){
		draw();
	}, Math.round(Math.random()*11600)+6000); //about 6sec - 17.6sec
}

draw = function(){
	//$('.go').show(); //.go will be an image representing to draw
	early = false;
	$('.draw').show();
	console.log("draw!");
	drawTime = Date.now();
}
commence = function(){
	$('#player').css('content', 'url("' + player.comm + '")');
	$('#player').css({left: 200});
	$('#opp').css('content', 'url("' + opp.comm + '")');
	$('#opp').css({left: 400});
	if(early == true){
		$('body').unbind();
		tooEarly();
	}
	else if(playerDraw > 0 && (playerDraw - drawTime < opp.delay)){ //delay is hard-coded per enemy hash
		$('body').unbind();
		playerWin();
	}
	else {
		$('body').unbind();
		lose();
	}
}

tooEarly = function(){
	clearTimeout(drawID);
	//red X shows up over player. either retry or lose..
	$('.wrong').show();
	console.log('too early');
	document.getElementById('speed').innerHTML='EARLY';
	setTimeout(function(){
		$('#pre').show();
		$('.wrong').hide();
	}, 6000);

}

playerWin = function(){
	console.log('player wins');
	setTimeout(function(){
		$('#opp').css('content', 'url("' + opp.lose + '")');
	}, 3000);
	level++;
	document.getElementById('lev').innerHTML=level;
	document.getElementById('speed').innerHTML= playerDraw-drawTime + 'ms';
	setTimeout(function(){
		$('#pre').show();
	}, 6000);
	}
	//show commIMG, hold a few seconds, enemy loses

lose = function(){
	console.log('player loses');
		setTimeout(function(){
		$('#player').css('content', 'url("' + player.lose + '")');
	}, 3000);
		level = 1;
		document.getElementById('lev').innerHTML=level;
		document.getElementById('speed').innerHTML=playerDraw-drawTime + 'ms';
	setTimeout(function(){
		$('#pre').show();
	}, 6000);
	//commIMG a few seconds, display player lose image, player loses
}
//onclick spacebar, run commence function
//if early while commence, player loses
//if not early and player presses space within time limit, player wins















$(function(){
	$('.readyButton').click(function(){
		//move players back out
		$('#player').css('content', 'url("' + player.ready + '")');
		$('#player').css({left: 100});
		$('#pre').hide();
		opp = opponents[level];
		$('#opp').css('content', 'url("' + opp.ready + '")');
		$('#opp').css({left: 500});
		$('.wrong').hide();
		$('.draw').hide();
		early = true;
		ready();
		$(function(){
	$('body').keypress(function(e){
		if (e.keyCode == 32){
			playerDraw = Date.now();
			$('.draw').hide();
			commence();
		}
	})
})
	})
	
});



