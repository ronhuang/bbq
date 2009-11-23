# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_bbq_session',
  :secret      => 'a079e48a023894d891ec5d8c54bf966cc42f5cfa61eb62bc549d3512e97961d54df785b8bd5c871f33249aefa24841a01ccb85c50a42f5fc3dda6c14d7602064'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
