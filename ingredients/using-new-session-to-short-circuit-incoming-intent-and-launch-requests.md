# Use NewSession to initialize your skill.


Say you're building a game that has several levels and you want to load your level data based upon the user's progress. Using `dynamoDB` you could persist the user's progress so when the skill is invoked you can load the level data where they left off, but how would you accomplish that? You can use the `NewSession` intent.

A skill containing a `NewSession` intent will automatically route all `IntentRequests` and `LaunchRequests` to it instead, so you'll have to pass the baton to the original intent when you're done.



```
// This will short-cut any incoming intent or launch requests and route them to this handler.
'NewSession': function() {
     if(Object.keys(this.attributes).length === 0) { // Check if it's the first time the skill has been invoked
        this.attributes['currentLevel'] = 0;
        this.attributes['gameScore'] = 0;
      }
      
      loadGameLevel();
      
      if (this.event.request.type === 'IntentRequest') {
          this.emit(this.event.request.name); 
      } 
      this.emit('LaunchRequest');
}
```

To route to the original intent, we emit the original intent via `this.event.request.name`