function vote_actions(type, id, color, value, label){
  count = $(type + id + "_count" + '[label=\''+ label + '\']').html();
  $(type + id + "_count" + '[label=\''+ label + '\']').html(parseInt(count) + value);
  $(type + id + '[label=\''+ label + '\']').css("fill", color);
  console.log($(type + id + "_count" + '[label=\''+ label + '\']')[0])
  console.log($(type + id + '[label=\''+ label + '\']')[0])
}

function actions(id, user, type, vote, post_type, comment_id = null) {

  if(comment_id == null)
  {
    $.ajax({
      type: "POST",
      url: `${window.location.href}`,
      data: { 
        'post_type': post_type,
        'action_type': vote, 
        'id': id, 
        'user': user, 
        'type': type, 
        'csrfmiddlewaretoken': window.CSRF_TOKEN },
      dataType: "json",
      success: function (response) {
        console.log('qaqa question')
        if (vote == "dislike") {
          if (response.disliked == "True") 
          {
            vote_actions(".dislike_",id, "#666f74", - 1, 'question');
          } 
          else 
          {
            vote_actions(".dislike_",id, "#2c62a0", 1, 'question');
            if (response.liked == "True")
            {
              vote_actions(".like_",id, "#666f74", - 1, 'question');
            }
          }
        }
        else if (vote == "like")
        {
          if (response.liked == "True") 
          {
            vote_actions(".like_",id, "#666f74", - 1, 'question');
          } 
          else 
          {
            vote_actions(".like_",id, "#2c62a0", 1, 'question');
            if (response.disliked == "True"){
              vote_actions(".dislike_",id, "#666f74", - 1, 'question');
            }
          }
        }
      },
    });
  }
  else
  {
    $.ajax({
      type: "POST",
      url: `${window.location.href}`,
      data: { 
        'post_type': post_type,
        'action_type': vote, 
        'id': id, 
        'comment_id' : comment_id,
        'user': user, 
        'type': type, 
        'csrfmiddlewaretoken': window.CSRF_TOKEN },
      dataType: "json",
      success: function (response) {
        console.log('qaqa comment')
        if (vote == "dislike") 
        {
          if (response.disliked == "True") 
          {
            vote_actions(".dislike_",comment_id, "#666f74", - 1, 'comment');
          } 
          else 
          {
            vote_actions(".dislike_",comment_id, "#2c62a0", 1, 'comment');
            if (response.liked == "True")
            {
              vote_actions(".like_",comment_id, "#666f74", - 1, 'comment');
            }
          }
        }
        else if (vote == "like"){
          if (response.liked == "True") {
            vote_actions(".like_",comment_id, "#666f74", - 1, 'comment');
          } else {
            vote_actions(".like_",comment_id, "#2c62a0", 1, 'comment');
            if (response.disliked == "True"){
              vote_actions(".dislike_",comment_id, "#666f74", - 1, 'comment');
            }
          }
        }
      },
    });
  }

}


