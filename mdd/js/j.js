
var obj = new Object();

function Object()
{
  this.main = main;
  this.instrucation=instrucation;
  

  function main()
   {
     $("#board").show();
     $("#instructionBox").hide();
     this.restart = restart;

    const $board = $('#board');
    const ROWS = 10;
    const COLS = 10;
    let icon = null;
    
    var gameOverSound = new Audio('music/Game Over.mp3');
    var gameWin = new Audio('music/You Win.mp3');
 

  function createBoard(rows, cols)
   {
      $board.empty();
      $('#button_div').show();
      for (let i = 0; i < rows; i++)
      {
          const $row = $('<div>').addClass('row');
      for (let j = 0; j < cols; j++) 
      {
          const $col = $('<div>')
          .addClass('col hidden')
          .attr('data-row', i)
          .attr('data-col', j);
      if (Math.random() < 0.1)
       {
          $col.addClass('mine');
       }
          $row.append($col);
      }
          $board.append($row);
    }
  }
  

  function restart()
  {
    createBoard(ROWS,COLS);
    $('#show_result_Win').hide();
    $('#show_result_Loss').hide();
  }
  
  function gameOver(isWin)
  {
    let message = null;
    if(isWin)
    {
      message = 'You Win';
      gameWin.play();
      $('#show_result_Win').show();
      $('#show_result_Loss').hide();
      $('.col.mine').append($('<img>').attr('src','./img/flag.PNG').css({'height':'25px','width':'25px'}));
    }
    else
    { 
      message = 'You Lost'; 
      $('.col.mine').append($('<img>').attr('src','./img/over.PNG').css({'height':'25px','width':'25px'}));
    }
    
    $('.col:not(.mine)').html(function()
    {
        const $cell = $(this);
        const count = getMineCount(
        $cell.data('row'),
        $cell.data('col'),
      );
      return count === 0 ? '' : count;
    })
  
      $('.col.hidden').removeClass('hidden');
      alert(message);
      $('#show_result_Loss').show();
       gameOverSound.play();
      setTimeout(restart, 5000);
  }
  
  
  function reveal(oi, oj) 
  {
      const seen = {};
  
      function helper(i, j) 
      {
        if (i >= ROWS || j >= COLS || i < 0 || j < 0) return;
          const key = `${i} ${j}`
        if (seen[key]) return;
          const $cell = $(`.col.hidden[data-row=${i}][data-col=${j}]`);
        const mineCount = getMineCount(i, j);
        if (
          !$cell.hasClass('hidden') ||
          $cell.hasClass('mine')
      ) 
      {
          return;
      }
  
      $cell.removeClass('hidden');
  
      if (mineCount) 
      {
        $cell.text(mineCount);
        return;
      }
      
      for (let di = -1; di <= 1; di++) 
      {
        for (let dj = -1; dj <= 1; dj++) 
        {
          helper(i + di, j + dj);
        }      
      }
    }
    helper(oi, oj);

  }
  
  function getMineCount(i,j)
  {
    let count = 0;
    for(let di = -1;di <=1;di++)
    {
      for(let dj= -1;dj <= 1;dj++)
      {
        var ni = i + di;
        var nj = j + dj;
        if(ni >= ROWS || nj >= COLS || nj < 0 || ni < 0 )continue;
        var $cell =
        $(`.col.hidden[data-row=${ni}][data-col=${nj}]`)
        if($cell.hasClass('mine'))count++;
  
      }
    }
     return count ;
  }
  
  $board.on('click','.col.hidden',function()
  {
    const $cell = $(this);
    const row = $cell.data('row');
    const col = $cell.data('col');
    console.log(row,col);
    if($cell.hasClass('mine'))
    {
      gameOver(false);
    }
    else
    {
      reveal(row,col);
      const isGameOver = $('.col.hidden').length === $('.col.mine').length
      if(isGameOver)gameOver(true);
    }
   
  })
  
  
  restart();
   } 

   function instrucation()
   {
    location.reload('.wrapper');
   }
 
}


