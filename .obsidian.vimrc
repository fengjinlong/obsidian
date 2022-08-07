map H 0
map L $
map J 5j
map K 5k

exmap toggleLeftSidebar obcommand app:toggle-left-sidebar
nmap <C-f> :toggleLeftSidebar

exmap back obcommand app:go-back 
nmap <C-o> :back 

exmap forward obcommand app:go-forward 
nmap <C-i> :forward

unmap <Space>


exmap dailyPlanners obcommand obsidian-day-planner:app:show-day-planner-today-note

nmap <Space>nn :dailyPlanners

exmap wiki surround [[ ]] 
map [[ :wiki
