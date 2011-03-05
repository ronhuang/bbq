require "orbit"
require "orbit.cache"

--
-- Declares that this is module is an Orbit app
--
module("bbq", package.seeall, orbit.new)

--
-- Loads configuration data
--
require "bbq_config"

--
-- Initializes DB connection for Orbit's default model mapper
--
require("luasql." .. database.driver)
local env = luasql[database.driver]()
mapper.conn = env:connect(unpack(database.conn_data))
mapper.driver = database.driver

-- Initializes page cache
local cache = orbit.cache.new(bbq, cache_path)

--
-- Models for this application. Orbit calls mapper:new for each model,
-- so if you want to replace Orbit's default ORM mapper by another
-- one (file-based, for example) just redefine the mapper global variable
--

groceries = bbq:model "grocery"

function groceries:foo()
end

--
-- Controllers for this application
--

function foo(web)
   local foo = groceries:foo()
   --return render_foo(web, { foo = foo })
   return web:page("foo.op")
end

bbq:dispatch_get(cache(foo), "/foo")

--
-- Views for this application
--

function render_foo(web, args)
   return html{
      head{
         title("BBQ"),
         meta{ ["http-equiv"] = "Content-Type",
               content = "text/html; charset=utf-8" },
         link{ rel = 'stylesheet', type = 'text/css',
               href = web:static_link('/css/reset-min.css'), media = 'screen' }
      },
      body{
         div{ id = "container",
              div{ id = "contents", p("FOO") },
           }
      }
   }
end

-- Adds html functions to the view functions

orbit.htmlify(bbq, "render_.+")
