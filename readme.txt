University of Sussex Prism templates.
=====================================

See:
http://www.capita-softwareandmanagedservices.co.uk/software/Pages/libraries-prism.aspx
http://www.capita-softwareandmanagedservices.co.uk/software/Documents/libraries-prism_design_guidelines.pdf

http://prism.talis.com/sussex-ac/
http://prism.talis.com/sussex-ac-sandbox/

Notes:
site.css is the css files used by the library site merged in to one, with some specific stuff at the end, to make it look as we want.
Prism takes this file and merges it in with their css to create one file for the application. 


Originally we used header.html to open a number of University template div/classes and footer to close them. 
However it actually looks like this

<div class="headerFragment">
header.html
</div>

As you can see, opening any div's means that: the last one will be closed by the mandatory div after header.html, secondly headerFragement will not be closed at the correct point. In particular an issue as it is hidden for the mobile theme.


