 var myuls = $(".slider_wrapper").find("ul");/*give div to ul*/
        for(var i=0;i<myuls.length;i++){
            $(myuls[i]).wrap("<div class='left_slider'></div>");
        }
        $(".left_slider").after("<div class='right_slider'></div>");/*create right_slider div*/
        var list = $(".right_slider").append('<ul></ul>').find('ul');/* add ul li in right slider*/
        for (var i = 0; i < $(".left_slider ul li").length; i++)
            list.append('<li></li>');
        $('.left_slider ul li').each(function(index){       /* for adding style*/
            var count=(($(".left_slider ul li").length)-(index+1));
            var bg=$(this).css('background-image');
            $( ".right_slider ul li" ).eq(count).css( "background-image",bg );
        });
        var wrapper_height=0,total_li=0,block_height=0,left_slider=0,right_slider=0,matrix_right=0,movment_tranlate_right=0,movment_right=0,matrix_left=0,movment_trasnlate_left=0,movment_left=0;
        $(".slider_viewport").height($( window ).height());
        $(".left_slider ul li,.right_slider ul li").height($( window ).height());
        console.log($(".left_slider ul li").height($( window ).height()));
        block_height = $(" .left_slider ul li").height();
        left_slider = $(" .left_slider").height();
        right_slider = $(" .right_slider").height();
        console.log(-(block_height-10));
        console.log(total_li);
        console.log(left_slider);
        wrapper_height = $(" .left_slider ul li").height();
        total_li = $(".left_slider ul li").length;
        $(".slider_wrapper").height(wrapper_height * total_li);
        var default_tranlate=(-wrapper_height*(total_li-1) + "px");
        $(".right_slider").css('transform', 'translateY(' + default_tranlate + ')');
        $(".left_slider").css('transform', 'translateY(0px)');

        function next_movment(){
            /*right check*/
            matrix_right=($('.right_slider').css('transform').split(',')[5]);/*for getting the value of translateY from matrix*/
            movment_tranlate_right=matrix_right.replace(/[^0-9\-.,]/g, '');
            movment_right = (parseInt(movment_tranlate_right) + $(".right_slider ul li").height() + "px");
            console.log('Rmoment',movment_tranlate_right);
            console.log('Rmomnet + height',movment_right);
            console.log('only translate',($(".right_slider ul li").height() + "px"));
            /*left side*/
            matrix_left=($('.left_slider').css('transform').split(',')[5]);
            movment_trasnlate_left=matrix_left.replace(/[^0-9\-.,]/g, '');
            movment_left = (parseInt(movment_trasnlate_left) - $(".right_slider ul li").height() + "px");
            console.log('L',movment_trasnlate_left,'',movment_left);
        }
        $("#next").click(function(){
            next_movment();
            /*oparations*/
            $("#next").parent().addClass("adis");
            /*for arrow display none*/
            /* if(movment_left>='-1999px'){$("#next").css('display','none');}else{$("#next").css('display','block');}*/
            if(movment_tranlate_right < (-(block_height-10)))
            {   
                $(".right_slider").css('transform', 'translateY(' + movment_right + ')');
                $(".left_slider").css('transform', 'translateY(' + movment_left + ')');
            }
            else
            {
                $(".right_slider").css('transform', 'translateY(' + default_tranlate + ')');
                $(".left_slider").css('transform', 'translateY(0px)');
                next_movment()
                if(movment_tranlate_right < (-(block_height-10)))
                {   
                    $(".right_slider").css('transform', 'translateY(' + movment_right + ')');
                    $(".left_slider").css('transform', 'translateY(' + movment_left + ')');
                }
            }
            /*set time out*/ 
            setTimeout(function() {
                $("#next").parent().removeClass("adis");
            }, 300)
        });
        function prev_movment(){
            matrix_right=($('.right_slider').css('transform').split(',')[5]);
            movment_tranlate_right=matrix_right.replace(/[^0-9\-.,]/g, '');
            movment_right = (parseInt(movment_tranlate_right) - $(".right_slider ul li").height() + "px");
            console.log('Rmoment',movment_tranlate_right);
            console.log('Rmomnet + height',movment_right);
            console.log('only translate',($(".right_slider ul li").height() + "px"));
            /*left side*/
            matrix_left=($('.left_slider').css('transform').split(',')[5]);
            movment_trasnlate_left=matrix_left.replace(/[^0-9\-.,]/g, '');
            movment_left = (parseInt(movment_trasnlate_left) + $(".right_slider ul li").height() + "px");
            console.log('L',movment_trasnlate_left,'after transalte',movment_left);
        }
        /*previous button*/
        $("#prev").click(function(){
            prev_movment()
            $("#prev").parent().addClass("adis");
            /*if(movment_left=='0px'){$("#prev").css('display','none');}*/
            if(movment_left <= '1px')/*basically it shold be 0 or 1 but we put 10 beacouse of possiblity of more tranlate as a error than after it work's good*/
            { 
                $(".right_slider").css('transform', 'translateY(' + movment_right + ')');
                $(".left_slider").css('transform', 'translateY(' + movment_left + ')');
            }
            else{
                $(".left_slider").css('transform', 'translateY(' + default_tranlate + ')');
                $(".right_slider").css('transform', 'translateY(0px)');
                prev_movment();
                if(movment_left <= '1px')
                {   
                    $(".right_slider").css('transform', 'translateY(' + movment_right + ')');
                    $(".left_slider").css('transform', 'translateY(' + movment_left + ')');
                }
            }
            /**/
            setTimeout(function() {
                $("#prev").parent().removeClass("adis");
            }, 300)
        })