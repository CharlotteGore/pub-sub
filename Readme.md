
# pub-sub

  Async Publish/Subscribe Component.

  This component allows isolated components to easily and neatly communicate with each other.

## Installation

    $ component install charlottegore/pub-sub

## API

### .subscribe( `signal`, `callback` )

  Add a callback to be fired on 'signal'.

    > var pubsub = require('pub-sub');
    > pubsub.subscribe("request for something", function( data ){
        console.log("there has been a request for ", data);
      })

### .publish( `signal`, `data` ) 

  Emit a message to any and all subscribers

    > pubsub.publish("request for something", 42);
    > there has been a request for 42

### .unsubscribe( `signal`, `callback` )

  Unsubscribe from a signal. The callback needs to be a reference to the function that was subscribed.

    > var handler = function(data){ console.log(data); }
    > pubsub.subscribe("some signal", handler);
    > pubsub.unsubscribe("some signal", handler);

## License

  MIT
