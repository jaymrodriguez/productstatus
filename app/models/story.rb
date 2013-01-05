class Story < ActiveRecord::Base
 belongs_to :area
 belongs_to :epic
 belongs_to :goal
 belongs_to :status
 belongs_to :team
 
 before_save do
   
   #Current Date to append to comments
   currentdate = Date.today.to_s
   
   #Check if the comments already has a date logged
   if (self.comments[4,1] != "-")
     self.comments = currentdate + " - " + self.comments
   end
 end
    
end
