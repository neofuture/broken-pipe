1) ~~Resizing windows does not respect minimum with and height~~
2) ~~Resizing windows does not respect max `innerHeight` and `innerWidth` settings~~
3) ~~Drag windows~~
4) ~~Restore from a tab~~ see *
5) ~~If window smaller than rules it gets weird with buttons, Put title bar text in a none overflow ellipses and have buttons respect the layout~~ Dont be stupid and make windows that break stuff
6) touch resize
7) touch drag
8) ~~BUG - Theres is a problem with zIndex tracking so need to refactor to find the highest zIndex in the window object then add one when makeactive is called~~
9) ~~it makeactive on a minimised windows then make it active again~~
10) ~~css style issues on chrome~~
11) ~~when a window is maximised, clicking on the title bar 'restores' the window and makes it none maximised~~
12) ~~window without a tab creates a blank spade which alters the width of the tabs, this may be that the math to space them needs to exclude hasTab === false~~
13) ~~window icons~~
14) ~~toolbar tab icons~~

* Should a window return to the view port in the same state is was minimised ?
** on window minimise should we search for the window that is the last used IE the highest zIndex that was last used, and activate that window
