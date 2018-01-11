#!/usr/bin/env escript

main([]) ->
  Profiles = ["default", "test", "eqc"],
  [begin compile_project(P), examine_beams(P) end || P <- Profiles],
  halt(1);
main([Profile]) ->
  compile_project(Profile),
  examine_beams(Profile),
  halt(1).
compile_project(Profile) ->
  remove_artifacts(),
  OsCmd = "rebar3 as " ++ Profile ++ " compile",
  os:cmd(OsCmd).
examine_beams(Profile) ->
  BeamPath = "_build/"++Profile++"/lib/rebartest/ebin/rebartest_sup.beam",
  io:format("profile: ~p, ~p~n" ,[Profile, beam_lib:chunks(BeamPath, [abstract_code])]).
remove_artifacts() ->
  os:cmd("rm -rf _build").
