class EatsController < ApplicationController
  def midautumn2007
    sort_by = params["sort"] || cookies[:sort] || "id DESC"
    cookies[:sort] = { :value => sort_by, :expires => Time.now + 168.hour }
    @groceries = Grocery.find(:all, :order => sort_by, :conditions => ["event = ?", Date.new(2007, 9, 15)])
    @source = "midautumn2007"

    respond_to do |format|
      format.html # midautumn2007.html.erb
      format.xml  { render :xml => @posts }
    end
  end

  def y2006
    @groceries = Grocery.find(:all, :order => "vote DESC, id ASC", :conditions => ["event = ?", Date.new(2006, 9, 22)])

    respond_to do |format|
      format.html # y2006.html.erb
      format.xml  { render :xml => @posts }
    end
  end

  def index
    redirect_to :action => "midautumn2007"
  end

end
