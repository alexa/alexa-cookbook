# Detecting if your skill has access to a display

With the release of the Echo Show the voice experience your skills bring 
to the user can be augmented with touch enabled display directives. 
If you wanted detect if your skill was invoked on a device with a display exists,
 so you can tailor your experince, you can check 
`this.event.context.System.device.supportedInterfaces.Display`

You can drop the following helper function into your code and go to town 
building your display directives.

    function supportsDisplay() {
      var hasDisplay =
        this.event.context &&
        this.event.context.System &&
        this.event.context.System.device &&
        this.event.context.System.device.supportedInterfaces &&
        this.event.context.System.device.supportedInterfaces.Display

      return hasDisplay;
    } 

From your intent you can call `supportsDisplay` and if it returns `true` you 
can build your display directive.

    if (supportsDisplay.call(this)) {
        // Build your display directive here
    }

For a more in-depth look at creating a display directive and leveraging this 
helper function see [display-directives/listTemplate/index.js](../display-directive/listTemplate/index.js) 
