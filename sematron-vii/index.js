com.taboca.upvisor.registerWidget( null , "org/sematron/3pane/gfxless.js","container");
com.taboca.upvisor.registerWidget( null , "org/sematron/calendar/calendar.js","calendar");
com.taboca.upvisor.registerWidget( ".container" , "org/sematron/clock/clock.js","clock", "area_cima_direita");
com.taboca.upvisor.registerWidget( ".container" , "org/sematron/fotogrid/fotogrid.js","imageshow", "area_panel1");
com.taboca.upvisor.registerWidget( ".container" , "org/sematron/rede-social/redesocial.js","palestras", "area_panel2");
com.taboca.upvisor.registerWidget( ".container" , "org/sematron/grade/grade.js","grade", "area_panel3");

com.taboca.upvisor.startEngine( function () { com.taboca.upvisor.raiseEvent(".calendar", "start"); } );
