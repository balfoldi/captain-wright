module ApiJson
  def build_object(object)
    { json: object, serializer: get_object_serializer(object) }
  end

  def build_objects(objects)
    { json: objects, each_serializer: get_object_serializer(objects.first) }
  end

  def build_object_error_managed(object)
    return build_object(object) if object.errors.empty?

    { json: { errors: object.errors.full_messages }, status: :bad_request }
  end

  def get_object_serializer(object)
    begin
      serializer = "Api::#{object.class.name}Serializer".constantize
    rescue
      serializer = Api::NilClassSerializer
    end
  end
end
