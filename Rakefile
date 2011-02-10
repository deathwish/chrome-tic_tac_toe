require 'lib/boot.rb'

task :default => :crx

require 'jasmine'
load 'jasmine/tasks/jasmine.rake'

require 'fileutils'
desc "remove generated files"
task :clean do
  ['build', 'dist'].each do |dir|
    FileUtils.rm_r dir if File.exist? dir
  end
end

directory "build"

directory "dist"

require 'sprockets'
desc "Build merged Javascript and assets using Sprockets"
task :sprockets => [:clean, "build"] do
  secretary = Sprockets::Secretary.new(
                                       :asset_root => "build",
                                       :load_path => ["vendor/javascripts"],
                                       :source_files => ["public/javascripts/*.js"]
                                       )
  concatenation = secretary.concatenation
  concatenation.save_to("build/app.js")
  secretary.install_assets
end

task :merge_css => [:sprockets] do
  files = Dir.glob 'build/*css'
  output = 'build/app.css'
  `cat #{files.join ' '} > #{output}`
  FileUtils.rm_f files
end

task :copy_licence => [ "build" ] do
  cp 'COPYING', "build"
end

require 'crxmake'
desc "Build a Chrome extension (.CRX)"
task :crx => [:sprockets, :merge_css, :copy_licence, "dist"] do
  CrxMake.make(
               :ex_dir => "./build",
               :pkey   => "./support/test.pem",
               :crx_output => "./dist/chrome_tac_toe-test.crx",
               :verbose => true,
               :ignorefile => /.*~$/,
               :ignoredir => /\.(?:svn|git|cvs)/
              )
end
