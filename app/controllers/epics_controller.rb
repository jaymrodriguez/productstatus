class EpicsController < ApplicationController
  # GET /epics
  # GET /epics.json
  def index
    @epics = Epic.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render :json => @epics }
    end
  end

  # GET /epics/1
  # GET /epics/1.json
  def show
    @epic = Epic.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render :json => @epic }
    end
  end

  # GET /epics/new
  # GET /epics/new.json
  def new
    @epic = Epic.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render :json => @epic }
    end
  end

  # GET /epics/1/edit
  def edit
    @epic = Epic.find(params[:id])
  end

  # POST /epics
  # POST /epics.json
  def create
    @epic = Epic.new(params[:epic])

    respond_to do |format|
      if @epic.save
        format.html { redirect_to @epic, :notice => 'Epic was successfully created.' }
        format.json { render :json => @epic, :status => :created, :location => @epic }
      else
        format.html { render :action => "new" }
        format.json { render :json => @epic.errors, :status => :unprocessable_entity }
      end
    end
  end

  # PUT /epics/1
  # PUT /epics/1.json
  def update
    @epic = Epic.find(params[:id])

    respond_to do |format|
      if @epic.update_attributes(params[:epic])
        format.html { redirect_to @epic, :notice => 'Epic was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render :action => "edit" }
        format.json { render :json => @epic.errors, :status => :unprocessable_entity }
      end
    end
  end

  # DELETE /epics/1
  # DELETE /epics/1.json
  def destroy
    @epic = Epic.find(params[:id])
    @epic.destroy

    respond_to do |format|
      format.html { redirect_to epics_url }
      format.json { head :ok }
    end
  end
end
