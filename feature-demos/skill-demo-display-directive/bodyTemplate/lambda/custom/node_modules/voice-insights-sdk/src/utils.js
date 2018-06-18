var array = [],
    object = {},
    string = String.prototype,
    toString = object.toString,
    hasOwn = object.hasOwnProperty,
    concat = array.concat,
    filter = array.filter,
    forEach = array.forEach,
    reduce = array.reduce,
    slice = array.slice,
    splice = array.splice,
    pop = array.pop,
    push = array.push,
    reverse = array.reverse,
    shift = array.shift,
    unshift = array.unshift,
    each = array.forEach,
    indexOf = array.indexOf,
    trim = string.trim,
    _each = function(collection, fn){
      var i = 0,
          k = collection.length;

      for(; i < k; i++){
        var result = fn.call(collection[i], collection[i], i);

        if(result === false){
          break;
        }
      }
    },
    _indexOf = function(collection, item){
      var i = 0,
          k = collection.length;

      for(; i < k; i++){
        if(collection[i] === item){
          return i;
        }
      }

      return -1;
    },
    _class2type = {};

var $ = {
  /**
   * Append additonal params to a URL query string
   * @param  {String} url     The URL to append the new items to
   * @param  {String} query   The additional query params
   * @return {String}         The new query string
   */
  appendQuery: function(url, query){
    return (url + '&' + query).replace(/[&?]{1,2}/, '?');
  },
  /**
   * Convert query string to key/value pairing
   * @param  {String} query The URL containing the params
   * @return {Object}       The new object containing the key value pairs from the query string
   */
  deparam: function(query){
    var result = {};

    if(!query){
      return result;
    }

    $.each(query.split('&'), function(index, value){
      if(value){
        var param = value.split('=');
        result[param[0]] = param[1];
      }
    });

    return result;
  },
  /**
   * Iterates over a collection of objects
   * @param {Mixed}    collection The collection to iterate over
   * @param {Function} fn         The callback function
   */
   each: function(collection, fn){
     if(typeof(collection.length) === 'number'){
       _each(collection, function(item, index){
         return fn.call(item, item, index);
       });
     }
     else if(typeof(collection) === 'object'){
       for(var key in collection){
         var result = fn.call(collection[key], key, collection[key]);

         if(result === false){
          break;
        }
      }
    }

    return this;
  },
  /**
   * Merge the contents of two or more objects into the target object
   * @param  {Boolean} deep      If true, the merge becomes recursive (optional)
   * @param  {Object}  target    The object receiving the new properties
   * @param  {Object}  arguments One or more additional objects to merge with the first
   * @return {Object}            The target object with the new contents
   */
   extend: function(){
     var i = 1,
         deep = false,
         dedup = false,
         target = arguments[0] || {},
         length = arguments.length;

     if(typeof(target) === 'boolean'){
       deep = target;
       target = arguments[1] || {};
       i++;

       if(typeof(target) === 'boolean'){
         dedup = target;
         target = arguments[2] || {};
         i++;
       }
     }

     if(i === length){
       target = this;
       i--;
     }

     slice.call(arguments, i).forEach(function(obj){
       var src, copy, isArray, clone;

       if(obj === target){
         return;
       }

       if(deep && $.isArray(obj)){
         target = dedup ? $.unique(target.concat(obj)) : target.concat(obj);
       }else{
         for(var key in obj){
           src = target[key];
           copy = obj[key];

           if(target === copy || src === copy){
             continue;
           }

           if(deep && copy && ($.isPlainObject(copy) || (isArray = $.isArray(copy)))){
             if(isArray){
               isArray = false;
               clone = src && $.isArray( src ) ? src : [];
             }else{
               clone = src && $.isPlainObject( src ) ? src : {};
             }

             if(dedup){
               target[key] = $.extend(deep, dedup, clone, copy);
             }else{
               target[key] = $.extend(deep, clone, copy);
             }
           }
           else if(copy !== undefined){
             target[key] = copy;
           }
         }
       }
     });

     return target;
   },
  /**
   * Returns a "flat" one-dimensional array
   * @param  {Array} array The multidimensional array to flatten
   * @return {Array}       The flattened array
   */
  flatten: function(array){
    return concat.apply([], array);
  },
  /**
   * Determine whether the array contains a specific value
   * @param  {Mixed}   item     The item to look for in the array
   * @param  {String}  array    The array of items
   * @param  {Boolean} position Set true to return the index of the matched item or -1
   * @return {Mixed}            The value of true or false, or the index at which the value can be found
   */
  inArray: function(item, array, position){
    var result;
    return $.isArray(array) ? (result = _indexOf(array, item)) && (position ? result : result !== -1) : -1;
  },
  /**
   * Determines if the passed obj is an array or array-like object (NodeList, Arguments, etc...)
   * @param  {Object}  obj Object to type check
   * @return {Boolean}     The true/false result
   */
  isArrayLike: function(obj){
    var type = $.type(obj),
        length = obj.length;

    if(type === 'function' || type === 'string'){
      return false;
    }

    if(obj.nodeType === 1 && length){
      return true;
    }

    return type === 'array' || length === 0 || typeof(length) === 'number' && length > 0 && (length - 1) in obj;
  },
  /**
   * Determines if the passed obj is empty
   * @param  {Object}  obj Object to check the contents of
   * @return {Boolean}     The true/false result
   */
  isEmptyObject: function(obj){
    for(var key in obj){
      return false;
    }

    return true;
  },
  /**
   * Determines whether the passed object is a number
   * @param  {Object}  obj Object to type check
   * @return {Boolean}     The true/false result
   */
  isNumber: function(obj){
    return !isNaN(parseFloat(obj)) && isFinite(obj);
  },
  /**
   * Determines whether the passed object is numeric
   * @param  {Object}  obj Object to type check
   * @return {Boolean}     The true/false result
   */
  isNumeric: function(obj){
    return !$.isArray(obj) && obj - parseFloat(obj) >= 0;
  },
  /**
   * Determine whether an Object is a plain object or not (created using "{}" or "new Object")
   * @param  {Object}  obj Object to type check
   * @return {Boolean}     The true/false result
   */
  isPlainObject: function(obj){
    return $.isObject(obj) && !obj.nodeType && Object.getPrototypeOf(obj) === Object.prototype;
  },
  /**
   * Returns a new array from the results of the mapping
   * @param  {Array}    items The array to map
   * @param  {Function} fn    The function to execute on each item
   * @return {Array}          The new array
   */
  map: function(items, fn){
    var k = items.length,
        key,
        value,
        values = [],
        i = 0;

    if(items.length){
      for(; i < k; i++){
        value = fn(items[i], i);

        if(value != null){
          values.push(value);
        }
      }
    }else{
      for(key in items){
        value = fn(items[key], key);

        if(value != null){
          values.push(value);
        }
      }
    }

    return $.flatten(values);
  },
  /**
   * Merge arrays - second into the first
   * @param  {Array} first   The array that will receive the new values
   * @param  {Array} second  The array that will be merged into the first - unaltered
   * @return {Array}         The modified array
   */
  merge: function(first, second){
    var total = second.length,
        length = first.length,
        i = 0;

    if(typeof(total) === 'number'){
      for(; i < total; i++){
        first[length++] = second[i];
      }
    }else{
      while(second[i] !== undefined){
        first[length++] = second[i++];
      }
    }

    first.length = length;

    return first;
  },
  /**
   * Parses a string as JSON, optionally transforming the value produced by parsing
   * @param  {String}   text    The string to parse as JSON
   * @param  {Function} reviver The transform function to execute on each key-value pair of the parsed object (optional)
   * @return {Object}           The parsed JSON string
   */
  parseJSON: function(text, reviver){
    return JSON.parse('' + text, reviver);
  },
  /**
   * Helper function to convert our data object to a valid URL query string
   * @param  {Object} data    The object containing all our query data
   * @return {String}         The query string
   */
  params: function(data){
    return $.serialize([], data).join('&').replace('%20', '+');
  },
  /**
   * Build query string from passed data arguments
   * @param  {Array}  params  The array to store our key = value pairs in
   * @param  {Object} data    The object containing the query data
   * @param  {String} scope   The scope of the params
   * @return {Array}          The updated params array
   */
  serialize: function(params, data, scope){
    var array = $.isArray(data),
        escape = encodeURIComponent;


    $.each(data, function(key, value){
      if(scope){
        key = scope + '[' + (array ? '' : key) + ']';
      }

      if($.isObject(value)){
        $.serialize(params, value, key)
      }else{
        params.push(escape(key) + '=' + escape(value));
      }
    });

    return params;
  },
  /**
   * Converts a value to JSON, optionally replacing values if a replacer function is specified
   * @param  {Mixed}  value    The value to convert to JSON
   * @param  {Mixed}  replacer Transforms values and properties encountered while stringifying (optional)
   * @param  {Mixed}  spaces   Causes the resulting string to be pretty-printed
   * @return {String}          The JSON string
   */
  stringify: function(value, replacer, spaces){
    return JSON.stringify(value, replacer, spaces);
  },
  /**
   * Removes newlines, spaces (including non-breaking), and tabs from a text string
   * @param  {String} text The text string to trim
   * @return {String}      The modified string
   */
  trim: function(text){
    return text === null ? '' : trim && trim.call(text) || ('' + text).replace($.regex.trim, '');
  },
  /**
   * Returns the internal JavaScript [Class]] of an object
   * @param  {Object} obj Object to check the class property of
   * @return {String}     Only the class property of the object
   */
  type: function(obj){
    return obj === null ? String(obj) : _class2type[toString.call(obj)] || 'object';
  },
  /**
   * Filters an array and by removing duplicates items
   * @param  {Array} collection The array to filter
   * @return {Array}            The modified array
   */
  unique: function(collection){
    for(var i = 0; i < collection.length; i++){
      if(_indexOf(collection, collection[i]) !== i){
        collection.splice(i, 1);
        i--;
      }
    }

    return collection;
  }
}

/**
 * Creates type class check methods $.isArray(), $.isBoolean(), ...
 * @param  {Object}  obj The object to type check
 * @return {Boolean}     The value of true or false
 */
_each(['Array', 'Boolean', 'Date', 'Error', 'Function', 'Object', 'RegExp', 'String'], function(name){
  _class2type['[object ' + name + ']' ] = name.toLowerCase();

  $['is' + name] = function(obj){
    return $.type(obj) === name.toLowerCase();
  }
});

module.exports = $;
