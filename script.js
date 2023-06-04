$(function () {
  $(document).ready(function() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || {}
  
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"))
  
    $(".saveBtn").on("click", function() {
      let hour = $(this).parent().attr("id")
      const description = $(this).siblings(".description").val().trim()
      savedTasks[hour] = description
  
      localStorage.setItem("tasks", JSON.stringify(savedTasks))
    })
  
    $.each(savedTasks, function(hour, description) {
      $("#" + hour).find(".description").val(description)
    })
  
    function updateHourStatus() {
      let currentHour = dayjs().hour()
  
      $(".time-block").each(function() {
        let blockHour = parseInt($(this).attr("id").split("-")[1])
  
        if (blockHour < currentHour) {
          $(this).removeClass("present future").addClass("past")
        } else if (blockHour === currentHour) {
          $(this).removeClass("past future").addClass("present")
        } else {
          $(this).removeClass("past present").addClass("future")
        }
      })
    }
  
    setInterval(updateHourStatus, 60000)
  
    updateHourStatus()
  })
  })