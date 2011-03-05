
-- Puts all the definitions below in bbq's namespace
module("bbq", package.seeall)

cache_path = "page_cache"

-- Uncomment this to send static files through X-Sendfile
-- use_xsendfile = true

database = {
  driver = "sqlite3",
  conn_data = { bbq.real_path .. "/production.db" }
}

